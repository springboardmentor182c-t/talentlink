# SERVER/apps/analytics/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 
from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth 
from datetime import datetime # Added import needed for strftime (good practice)
from rest_framework import serializers, status # Added if serializers aren't imported separately

# --- FINAL CORRECTED MODEL IMPORTS ---
# Proposal is confirmed in 'messaging'.
from apps.proposals.models import Proposal


# Project and Skill are now DEFINITELY in the 'projects' app.
from apps.projects.models import Project, Skill 

# Import contracts
from apps.contracts.models import Contract

# Assuming your serializers are imported like this (You confirmed this setup)
from .serializers import ActivityAnalyticsSerializer, SkillsAnalyticsSerializer

# ----------------------------------------------------------------------------------

class ProjectAnalyticsView(APIView):
    """
    Tracks the activity of the freelancer's projects, grouped by the month they were created.
    API Path: /api/v1/analytics/projects/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        freelancer = request.user # Assumes request.user is the Freelancer/User object
        
        # Django ORM Query: 
        # 1. Filter projects belonging to the freelancer.
        # 2. Group by the month/year of the 'created_at' date field (TruncMonth).
        # 3. Count the projects in each group (Count('id')).
        monthly_activity = Project.objects.filter(
            freelancer=freelancer # Assuming Project model has a 'freelancer' Foreign Key
        ).annotate(
            month=TruncMonth('created_at') # Groups the dates into month/year
        ).values('month').annotate(
            count=Count('id') 
        ).order_by('month')
        
        # Format the data for the serializer
        formatted_data = [
            # Formats the month/year object (e.g., datetime.date) into a string (e.g., '2025-12')
            {'label': item['month'].strftime('%Y-%m'), 'count': item['count']}
            for item in monthly_activity
        ]
        
        serializer = ActivityAnalyticsSerializer(formatted_data, many=True)
        return Response({
            'monthly_project_activity': serializer.data
        })


class ProposalAnalyticsView(APIView):
    """
    Tracks the activity of the freelancer's proposals, grouped by status.
    API Path: /api/v1/analytics/proposals/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        freelancer = request.user 
        
        # Django ORM Query:
        # 1. Filter proposals belonging to the freelancer.
        # 2. Group by the 'status' field (e.g., 'Pending', 'Accepted').
        # 3. Count the proposals in each status group.
        status_distribution = Proposal.objects.filter(
            freelancer=freelancer # Assuming Proposal model has a 'freelancer' Foreign Key
        ).values('status').annotate(
            count=Count('id') 
        ).order_by('-count') # Order by count descending

        # Format the data
        formatted_data = [
            {'label': item['status'], 'count': item['count']}
            for item in status_distribution
        ]

        serializer = ActivityAnalyticsSerializer(formatted_data, many=True)
        return Response({
            'proposal_status_distribution': serializer.data
        })


class SkillsAnalyticsView(APIView):
    """
    Tracks the number of projects associated with each skill the freelancer has.
    API Path: /api/v1/analytics/skills/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        freelancer = request.user
        
        # Django ORM Query:
        # Assumption: Project model has a ManyToMany field named 'skills' linked to the Skill model.
        # 1. Filter projects belonging to the freelancer.
        # 2. Use double underscore notation ('skills__name') to join and group by the skill name.
        # 3. Count the projects for each skill.
        projects_per_skill = Project.objects.filter(
            freelancer=freelancer
        ).values(
            'skills__name' # Traverses the M2M relationship to get the Skill name
        ).annotate(
            project_count=Count('id')
        ).order_by('-project_count')

        # Format and clean the data (removes any entries where skill__name is None)
        formatted_data = [
            {'skill_name': item['skills__name'], 'project_count': item['project_count']}
            for item in projects_per_skill if item['skills__name'] is not None
        ]
        
        serializer = SkillsAnalyticsSerializer(formatted_data, many=True)
        return Response({
            'projects_per_skill': serializer.data
        })


class DashboardStatsView(APIView):
    """
    Get overall dashboard statistics for the freelancer.
    API Path: /api/v1/analytics/dashboard-stats/
    
    Returns:
    - this_month_revenue: Total revenue from contracts in current month
    - projects_accepted: Total number of accepted proposals
    - delivered_on_time: Percentage of on-time deliveries
    - active_contracts: Number of active contracts
    - pending_proposals: Number of pending proposals
    - completed_projects: Number of completed projects
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        freelancer = request.user
        from django.utils import timezone
        from dateutil.relativedelta import relativedelta
        
        current_month = timezone.now()
        month_start = current_month.replace(day=1)
        
        # Get contracts for current month
        current_month_contracts = Contract.objects.filter(
            freelancer=freelancer,
            created_at__gte=month_start,
            created_at__lte=current_month
        )
        
        # Calculate this month's revenue (assuming bid_amount on proposals)
        this_month_revenue = 0
        for contract in current_month_contracts:
            if hasattr(contract, 'proposal') and contract.proposal:
                this_month_revenue += float(contract.proposal.bid_amount or 0)
        
        # Get proposal statistics
        proposals = Proposal.objects.filter(freelancer=freelancer)
        accepted_proposals = proposals.filter(status='accepted').count()
        pending_proposals = proposals.filter(status='pending').count()
        
        # Get contract statistics
        active_contracts = Contract.objects.filter(
            freelancer=freelancer,
            status='active'
        ).count()
        
        # Get project statistics
        projects = Project.objects.filter(freelancer=freelancer)
        completed_projects = projects.filter(status='COMPLETED').count()
        active_projects = projects.filter(status='ACTIVE').count()
        
        # Calculate on-time delivery percentage (assuming all completed projects are on time for now)
        total_projects = projects.count()
        delivered_on_time = (completed_projects / total_projects * 100) if total_projects > 0 else 0
        
        stats = {
            'this_month_revenue': f"${this_month_revenue:,.2f}",
            'projects_accepted': accepted_proposals,
            'delivered_on_time': f"{delivered_on_time:.1f}%",
            'active_contracts': active_contracts,
            'pending_proposals': pending_proposals,
            'completed_projects': completed_projects,
            'active_projects': active_projects,
            'total_projects': total_projects,
        }
        
        return Response(stats, status=status.HTTP_200_OK)
# # SERVER/apps/analytics/views.py

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated 
# from django.db.models import Count 
# from django.db.models.functions import TruncMonth 
# from datetime import datetime # Added import needed for strftime (good practice)
# from rest_framework import serializers # Added if serializers aren't imported separately

# # --- FINAL CORRECTED MODEL IMPORTS ---
# # Proposal is confirmed in 'messaging'.
# from apps.proposals.models import Proposal


# # Project and Skill are now DEFINITELY in the 'projects' app.
# from apps.projects.models import Project, Skill 

# # Assuming your serializers are imported like this (You confirmed this setup)
# from .serializers import ActivityAnalyticsSerializer, SkillsAnalyticsSerializer

# # ----------------------------------------------------------------------------------

# class ProjectAnalyticsView(APIView):
#     """
#     Tracks the activity of the freelancer's projects, grouped by the month they were created.
#     API Path: /api/v1/analytics/projects/
#     """
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         freelancer = request.user # Assumes request.user is the Freelancer/User object
        
#         # Django ORM Query: 
#         # 1. Filter projects belonging to the freelancer.
#         # 2. Group by the month/year of the 'created_at' date field (TruncMonth).
#         # 3. Count the projects in each group (Count('id')).
#         monthly_activity = Project.objects.filter(
#             freelancer=freelancer # Assuming Project model has a 'freelancer' Foreign Key
#         ).annotate(
#             month=TruncMonth('created_at') # Groups the dates into month/year
#         ).values('month').annotate(
#             count=Count('id') 
#         ).order_by('month')
        
#         # Format the data for the serializer
#         formatted_data = [
#             # Formats the month/year object (e.g., datetime.date) into a string (e.g., '2025-12')
#             {'label': item['month'].strftime('%Y-%m'), 'count': item['count']}
#             for item in monthly_activity
#         ]
        
#         serializer = ActivityAnalyticsSerializer(formatted_data, many=True)
#         return Response({
#             'monthly_project_activity': serializer.data
#         })


# class ProposalAnalyticsView(APIView):
#     """
#     Tracks the activity of the freelancer's proposals, grouped by status.
#     API Path: /api/v1/analytics/proposals/
#     """
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         freelancer = request.user 
        
#         # Django ORM Query:
#         # 1. Filter proposals belonging to the freelancer.
#         # 2. Group by the 'status' field (e.g., 'Pending', 'Accepted').
#         # 3. Count the proposals in each status group.
#         status_distribution = Proposal.objects.filter(
#             freelancer=freelancer # Assuming Proposal model has a 'freelancer' Foreign Key
#         ).values('status').annotate(
#             count=Count('id') 
#         ).order_by('-count') # Order by count descending

#         # Format the data
#         formatted_data = [
#             {'label': item['status'], 'count': item['count']}
#             for item in status_distribution
#         ]

#         serializer = ActivityAnalyticsSerializer(formatted_data, many=True)
#         return Response({
#             'proposal_status_distribution': serializer.data
#         })


# class SkillsAnalyticsView(APIView):
#     """
#     Tracks the number of projects associated with each skill the freelancer has.
#     API Path: /api/v1/analytics/skills/
#     """
#     permission_classes = [IsAuthenticated]

#     # def get(self, request):
#     #     freelancer = request.user
        
#     #     # Django ORM Query:
#     #     # Assumption: Project model has a ManyToMany field named 'skills' linked to the Skill model.
#     #     # 1. Filter projects belonging to the freelancer.
#     #     # 2. Use double underscore notation ('skills__name') to join and group by the skill name.
#     #     # 3. Count the projects for each skill.
#     #     projects_per_skill = Project.objects.filter(
#     #         freelancer=freelancer
#     #     ).values(
#     #         'skills__name' # Traverses the M2M relationship to get the Skill name
#     #     ).annotate(
#     #         project_count=Count('id')
#     #     ).order_by('-project_count')

#     #     # Format and clean the data (removes any entries where skill__name is None)
#     #     formatted_data = [
#     #         {'skill_name': item['skills__name'], 'project_count': item['project_count']}
#     #         for item in projects_per_skill if item['skills__name'] is not None
#     #     ]
        
#     #     serializer = SkillsAnalyticsSerializer(formatted_data, many=True)
#     #     return Response({
#     #         'projects_per_skill': serializer.data
#     #     })

#     def get(self, request):
#         freelancer = request.user
        
#         projects_per_skill = Project.objects.filter(
#             freelancer=freelancer
#         ).values(
#             'skills__name'
#         ).annotate(
#             project_count=Count('id')
#         ).order_by('-project_count')

#         # --- TEMPORARY DEBUGGING CHANGE ---
#         # formatted_data = [
#         #     {'skill_name': item['skills__name'], 'project_count': item['project_count']}
#         #     for item in projects_per_skill if item['skills__name'] is not None
#         # ]
        
#         # JUST RETURN THE RAW QUERYSET
#         return Response({
#             'projects_per_skill': list(projects_per_skill)
#         })


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated 
# from django.db.models import Count, Q # Added Q for robust skills query
# from django.db.models.functions import TruncMonth 
# from datetime import datetime
# from django.db import models # Needed for models.Q filter
# # from rest_framework import serializers # Not needed if imported in serializers.py

# # --- Model Imports ---
# # Assuming these imports are correct based on your file structure
# from apps.proposals.models import Proposal
# from apps.projects.models import Project, Skill 

# # Assuming your serializers are imported like this
# from .serializers import ActivityAnalyticsSerializer, SkillsAnalyticsSerializer

# # ----------------------------------------------------------------------------------

# class ProjectAnalyticsView(APIView):
#     """
#     Tracks the activity of the freelancer's projects, grouped by the month they were created.
#     API Path: /api/v1/analytics/projects/
#     """
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         freelancer = request.user
        
#         # Django ORM Query for monthly activity
#         monthly_activity = Project.objects.filter(
#             freelancer=freelancer
#         ).annotate(
#             month=TruncMonth('created_at')
#         ).values('month').annotate(
#             count=Count('id') 
#         ).order_by('month')
        
#         # Format the data
#         formatted_data = [
#             {'label': item['month'].strftime('%Y-%m'), 'count': item['count']}
#             for item in monthly_activity
#         ]
        
#         serializer = ActivityAnalyticsSerializer(formatted_data, many=True)
#         return Response({
#             'monthly_project_activity': serializer.data
#         })


# class ProposalAnalyticsView(APIView):
#     """
#     Tracks the activity of the freelancer's proposals, grouped by status.
#     API Path: /api/v1/analytics/proposals/
#     """
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         freelancer = request.user 
        
#         # Django ORM Query for status distribution
#         status_distribution = Proposal.objects.filter(
#             freelancer=freelancer
#         ).values('status').annotate(
#             count=Count('id') 
#         ).order_by('-count')

#         # Format the data
#         formatted_data = [
#             {'label': item['status'], 'count': item['count']}
#             for item in status_distribution
#         ]

#         serializer = ActivityAnalyticsSerializer(formatted_data, many=True)
#         return Response({
#             'proposal_status_distribution': serializer.data
#         })


# class SkillsAnalyticsView(APIView):
#     """
#     Tracks the number of projects associated with each skill the freelancer has.
#     API Path: /api/v1/analytics/skills/
#     """
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         freelancer = request.user
        
#         # FINAL, ROBUST QUERY: Querying from Skill model using the confirmed 'projects' related_name.
#         # This addresses the silent failure when counting M2M relationships.
        
#         projects_per_skill = Skill.objects.filter(
#             # Filter skills that are linked to a project owned by the freelancer
#             projects__freelancer=freelancer 
#         ).annotate(
#             # Count the projects *specifically* related to this skill AND this freelancer.
#             # We use the explicit related_name 'projects' for the Count function.
#             project_count=Count(
#                 'projects', 
#                 filter=models.Q(projects__freelancer=freelancer)
#             )
#         ).values(
#             'name',
#             'project_count'
#         ).order_by('-project_count')

#         # Format the data
#         formatted_data = [
#             {'skill_name': item['name'], 'project_count': item['project_count']}
#             for item in projects_per_skill
#         ]
        
#         serializer = SkillsAnalyticsSerializer(formatted_data, many=True)
#         return Response({
#             'projects_per_skill': serializer.data
#         })




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 
from django.db.models import Count, Q 
from django.db.models.functions import TruncMonth 
from datetime import datetime
from django.db import models 
from collections import Counter # --- Added for manual skill counting

# --- Model Imports ---
from apps.proposals.models import Proposal
from apps.projects.models import Project

# --- Serializer Imports ---
from .serializers import ActivityAnalyticsSerializer, SkillsAnalyticsSerializer

# ----------------------------------------------------------------------------------

class ProjectAnalyticsView(APIView):
    """
    Tracks the activity of projects (both owned by client and worked on by freelancer).
    API Path: /api/v1/analytics/projects/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Updated Logic: Check if user is the Client (owner) OR the Freelancer (hired)
        monthly_activity = Project.objects.filter(
            Q(client=user) | Q(freelancer=user)
        ).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            count=Count('id') 
        ).order_by('month')
        
        # Format the data
        formatted_data = [
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
        user = request.user 
        
        # Django ORM Query for status distribution
        status_distribution = Proposal.objects.filter(
            freelancer=user
        ).values('status').annotate(
            count=Count('id') 
        ).order_by('-count')

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
    Tracks the demand for skills based on Active projects.
    Updated to work with the text-based 'required_skills' field.
    API Path: /api/v1/analytics/skills/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 1. Fetch 'required_skills' text from all Active projects
        # We use values_list to get a simple list of strings ["React, Python", "Django", ...]
        projects_skills = Project.objects.filter(status='Active').values_list('required_skills', flat=True)

        all_skills = []

        # 2. Parse the strings in Python
        for skill_string in projects_skills:
            if skill_string:
                # Split "React, Django" into ["React", "Django"] and clean whitespace
                parts = [s.strip() for s in skill_string.split(',') if s.strip()]
                all_skills.extend(parts)

        # 3. Count frequencies using Python's Counter
        skill_counts = Counter(all_skills)

        # 4. Format data for the frontend (Top 10 skills)
        # Matches the expected keys: 'skill_name' and 'project_count'
        formatted_data = [
            {'skill_name': name, 'project_count': count}
            for name, count in skill_counts.most_common(10)
        ]
        
        # We return the data directly since we manually constructed the dictionary 
        # structure that the frontend expects.
        return Response({
            'projects_per_skill': formatted_data
        })
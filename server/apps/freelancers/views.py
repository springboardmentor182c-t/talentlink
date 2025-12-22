from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Q, Sum
from django.utils import timezone
from datetime import datetime, timedelta

from .models import FreelancerProfile
from .serializers import FreelancerProfileSerializer
from apps.projects.models import Project
from apps.contracts.models import Contract
from apps.proposals.models import ProjectProposal


class FreelancerProfileViewSet(viewsets.ModelViewSet):
    serializer_class = FreelancerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Restrict profiles to the authenticated freelancer's own profile
        return FreelancerProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Ensure the profile is always tied to the authenticated freelancer
        serializer.save(user=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def freelancer_dashboard(request):
    """Get freelancer dashboard statistics and overview data"""
    try:
        user = request.user
        
        # Get freelancer profile
        try:
            profile = FreelancerProfile.objects.get(user=user)
        except FreelancerProfile.DoesNotExist:
            return Response({'error': 'Freelancer profile not found'}, status=404)
        
        # Proposal statistics
        total_proposals = ProjectProposal.objects.filter(freelancer=user).count()
        pending_proposals = ProjectProposal.objects.filter(freelancer=user, status='pending').count()
        accepted_proposals = ProjectProposal.objects.filter(freelancer=user, status='accepted').count()
        rejected_proposals = ProjectProposal.objects.filter(freelancer=user, status='rejected').count()
        
        # Freelancer's contracts statistics
        total_contracts = Contract.objects.filter(freelancer=user).count()
        active_contracts = Contract.objects.filter(freelancer=user, status='active').count()
        completed_contracts = Contract.objects.filter(freelancer=user, status='completed').count()
        
        # Total earnings
        total_earnings = Contract.objects.filter(
            freelancer=user,
            status='completed'
        ).aggregate(total=Sum('budget'))['total'] or 0
        
        # Recent proposals
        recent_proposals = ProjectProposal.objects.filter(freelancer=user).order_by('-created_at')[:5].values(
            'id', 'project__title', 'status', 'budget', 'created_at', 'cover_letter'
        )
        
        # Recent contracts
        recent_contracts = Contract.objects.filter(freelancer=user).order_by('-created_at')[:5].values(
            'id', 'project__title', 'status', 'budget', 'created_at'
        )
        
        # Monthly earnings for charts
        last_6_months = timezone.now() - timedelta(days=180)
        monthly_earnings = list(Contract.objects.filter(
            freelancer=user,
            created_at__gte=last_6_months,
            status='completed'
        ).extra(
            select={'month': "strftime('%%Y-%%m', created_at)"}
        ).values('month').annotate(
            total=Sum('budget')
        ).order_by('month'))
        
        # Success rate
        if total_proposals > 0:
            success_rate = (accepted_proposals / total_proposals) * 100
        else:
            success_rate = 0
        
        return Response({
            'profile': {
                'id': profile.id,
                'bio': profile.bio,
                'skills': profile.skills,
                'hourlyRate': profile.hourly_rate,
                'rating': profile.rating,
                'totalEarnings': profile.total_earnings,
                'totalJobs': profile.total_jobs,
                'availability': profile.availability_status
            },
            'stats': {
                'totalProposals': total_proposals,
                'pendingProposals': pending_proposals,
                'acceptedProposals': accepted_proposals,
                'rejectedProposals': rejected_proposals,
                'totalContracts': total_contracts,
                'activeContracts': active_contracts,
                'completedContracts': completed_contracts,
                'totalEarnings': total_earnings,
                'successRate': round(success_rate, 2)
            },
            'recentProposals': list(recent_proposals),
            'recentContracts': list(recent_contracts),
            'monthlyEarnings': monthly_earnings
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def freelancer_profile(request):
    """Get freelancer profile data"""
    try:
        user = request.user
        
        try:
            profile = FreelancerProfile.objects.get(user=user)
        except FreelancerProfile.DoesNotExist:
            return Response({'error': 'Freelancer profile not found'}, status=404)
        
        return Response({
            'id': profile.id,
            'userId': user.id,
            'username': user.username,
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'bio': profile.bio,
            'skills': profile.skills,
            'hourlyRate': profile.hourly_rate,
            'rating': profile.rating,
            'totalEarnings': profile.total_earnings,
            'totalJobs': profile.total_jobs,
            'availabilityStatus': profile.availability_status,
            'dateJoined': user.date_joined,
            'isActive': user.is_active
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def freelancer_profile_update(request):
    """Update freelancer profile"""
    try:
        user = request.user
        data = request.data
        
        try:
            profile = FreelancerProfile.objects.get(user=user)
        except FreelancerProfile.DoesNotExist:
            return Response({'error': 'Freelancer profile not found'}, status=404)
        
        # Update user fields
        if 'firstName' in data:
            user.first_name = data['firstName']
        if 'lastName' in data:
            user.last_name = data['lastName']
        if 'email' in data:
            user.email = data['email']
        
        # Update profile fields
        if 'bio' in data:
            profile.bio = data['bio']
        if 'skills' in data:
            profile.skills = data['skills']
        if 'hourlyRate' in data:
            profile.hourly_rate = data['hourlyRate']
        if 'availabilityStatus' in data:
            profile.availability_status = data['availabilityStatus']
        
        user.save()
        profile.save()
        
        return Response({
            'id': profile.id,
            'userId': user.id,
            'username': user.username,
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'bio': profile.bio,
            'skills': profile.skills,
            'hourlyRate': profile.hourly_rate,
            'rating': profile.rating,
            'totalEarnings': profile.total_earnings,
            'totalJobs': profile.total_jobs,
            'availabilityStatus': profile.availability_status,
            'dateJoined': user.date_joined,
            'isActive': user.is_active
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)
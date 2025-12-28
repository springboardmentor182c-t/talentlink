
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Q, Count
from apps.projects.models import Project
from apps.proposals.models import ProjectProposal
from apps.profile.models import FreelancerProfile

# endpoint: /api/analytics/freelancer/dashboard-analytics/
class FreelancerDashboardAnalytics(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not hasattr(user, 'user_type') or user.user_type not in ['freelancer', 'both']:
            return Response({'detail': 'Not a freelancer.'}, status=status.HTTP_403_FORBIDDEN)

        try:
            profile = user.freelancer_profile
        except Exception:
            return Response({'detail': 'Freelancer profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        skills = [s.strip() for s in (profile.skills or '').split(',') if s.strip()]

        projects = Project.objects.filter(
            Q(description__icontains=user.username) | Q(skills__iregex=r'(' + '|'.join(skills) + ')')
        ) if skills else Project.objects.none()
        project_count = projects.count()

        proposals = ProjectProposal.objects.filter(freelancer=user)
        proposal_count = proposals.count()

        projects_per_skill = []
        for skill in skills:
            count = Project.objects.filter(skills__icontains=skill).count()
            projects_per_skill.append({'skill': skill, 'count': count})

        recent_projects = projects.order_by('-created_at')[:10].values('id', 'title', 'status', 'created_at')

        recent_proposals = proposals.order_by('-created_at')[:10].values('id', 'project_id', 'status', 'created_at')

        return Response({
            'project_count': project_count,
            'proposal_count': proposal_count,
            'projects_per_skill': projects_per_skill,
            'recent_projects': list(recent_projects),
            'recent_proposals': list(recent_proposals),
        })

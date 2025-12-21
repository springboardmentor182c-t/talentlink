from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q 

from .models import Project, Skill
# IMPORT PROPOSAL FROM THE OTHER APP
from apps.proposals.models import Proposal 
from .serializers import ProjectSerializer, SkillSerializer, ProposalSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('name')
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProposalViewSet(viewsets.ModelViewSet):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Proposal.objects.filter(freelancer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'required_skills']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Project.objects.none()

        # Show Client posts OR Freelancer hired jobs (excluding Open ones)
        return Project.objects.filter(
            Q(client=user) | Q(freelancer=user)
        ).exclude(status='Open').distinct().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(client=self.request.user, status='Open')

@api_view(['GET'])
@permission_classes([permissions.AllowAny]) 
def get_open_projects(request):
    projects = Project.objects.filter(status='Open').order_by('-created_at')
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
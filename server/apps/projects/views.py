from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoints for Project CRUD operations.
    
    GET /api/v1/projects/ - List all projects for the freelancer
    POST /api/v1/projects/ - Create a new project
    GET /api/v1/projects/{id}/ - Get a specific project
    PUT/PATCH /api/v1/projects/{id}/ - Update a project
    DELETE /api/v1/projects/{id}/ - Delete a project
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return projects for the logged-in user"""
        user = self.request.user
        return Project.objects.filter(freelancer=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        """Automatically set the freelancer to the logged-in user"""
        serializer.save(freelancer=self.request.user)


class ProjectListView(generics.ListCreateAPIView):
    """
    List and create projects for the freelancer.
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        status_filter = self.request.query_params.get('status')
        
        qs = Project.objects.filter(freelancer=user).order_by('-created_at')
        
        if status_filter:
            qs = qs.filter(status=status_filter)
        
        return qs
    
    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a specific project.
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(freelancer=user)


class ProjectStatsView(APIView):
    """
    Get statistics about the freelancer's projects.
    
    Returns:
    - total_projects: Total number of projects
    - active_projects: Number of active projects
    - completed_projects: Number of completed projects
    - pending_projects: Number of pending projects
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        freelancer = request.user
        projects = Project.objects.filter(freelancer=freelancer)
        
        stats = {
            'total_projects': projects.count(),
            'active_projects': projects.filter(status='ACTIVE').count(),
            'completed_projects': projects.filter(status='COMPLETED').count(),
            'pending_projects': projects.filter(status='PENDING').count(),
        }
        
        return Response(stats, status=status.HTTP_200_OK)

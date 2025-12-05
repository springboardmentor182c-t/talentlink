from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.permissions import IsAuthenticated
from .models import SavedProject
from .serializers import SavedProjectSerializer


class IsClientOrReadOnly(IsAuthenticated):
    # For brevity we'll use IsAuthenticated and check object ownership in perform_update/perform_destroy
    pass


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'duration_days']
    search_fields = ['title', 'description', 'skills']
    ordering_fields = ['created_at', 'budget_min']

    def get_queryset(self):
        user = self.request.user
        # Clients see their own projects in management endpoints; freelancers can list open projects
        if self.action in ['list']:
            role = getattr(user, 'is_staff', False)
            # Expose all projects but filter by query params in search endpoint
            return Project.objects.filter(status__in=[Project.POSTED, Project.OPEN]).order_by('-created_at')
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    def perform_update(self, serializer):
        # Only client who owns it can update
        project = self.get_object()
        if project.client != self.request.user:
            return Response({'detail': 'Not allowed'}, status=status.HTTP_403_FORBIDDEN)
        serializer.save()

    def perform_destroy(self, instance):
        if instance.client != self.request.user:
            return Response({'detail': 'Not allowed'}, status=status.HTTP_403_FORBIDDEN)
        instance.delete()

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        qs = Project.objects.filter(status=Project.OPEN)
        skills = request.query_params.getlist('skill')
        min_budget = request.query_params.get('min_budget')
        max_budget = request.query_params.get('max_budget')
        duration = request.query_params.get('duration')

        if skills:
            # skills stored as list in JSONField
            for s in skills:
                qs = qs.filter(skills__contains=[s])

        if min_budget:
            qs = qs.filter(budget_min__gte=min_budget)
        if max_budget:
            qs = qs.filter(budget_max__lte=max_budget)
        if duration:
            qs = qs.filter(duration_days__lte=duration)

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class SavedProjectViewSet(viewsets.ModelViewSet):
    queryset = SavedProject.objects.all().order_by('-saved_at')
    serializer_class = SavedProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Freelancers only see their saved projects
        user = self.request.user
        return SavedProject.objects.filter(freelancer=user).order_by('-saved_at')

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)

    def perform_destroy(self, instance):
        if instance.freelancer != self.request.user:
            return Response({'detail': 'Not allowed'}, status=status.HTTP_403_FORBIDDEN)
        instance.delete()

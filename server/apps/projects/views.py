from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):

    def perform_create(self, serializer):
        user = self.request.user
        if user and user.is_authenticated and hasattr(user, 'user_type') and getattr(user, 'user_type', None) == 'client':
            serializer.save(client=user)
        else:
            serializer.save()

    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        my_param = self.request.query_params.get('my')
        if my_param and user and user.is_authenticated and hasattr(user, 'user_type'):
            if getattr(user, 'user_type', None) == 'client':
                return qs.filter(client=user)
        return qs

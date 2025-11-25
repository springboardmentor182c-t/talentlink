from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer

class CreateProjectView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ListProjectsView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

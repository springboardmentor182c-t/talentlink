# proposals/views.py
from django.contrib.auth import get_user_model
from rest_framework import viewsets, generics
from .models import ProjectProposal
from .serializers import ProposalSerializer

User = get_user_model()

class ProposalViewSet(viewsets.ModelViewSet):
    queryset = ProjectProposal.objects.all().order_by("-created_at")
    serializer_class = ProposalSerializer
    permission_classes = []

    def get_queryset(self):
        project_id = self.request.query_params.get("project_id")
        if project_id:
            return self.queryset.filter(project_id=project_id)
        return self.queryset

class ProposalCreateView(generics.CreateAPIView):
    queryset = ProjectProposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = []

    def get_serializer_context(self):
        context = super().get_serializer_context()

        if self.request.user.is_authenticated:
            context["freelancer"] = self.request.user
        else:
            anonymous_user, _ = User.objects.get_or_create(
                username="anonymous",
                defaults={"email": "anonymous@example.com"}
            )
            context["freelancer"] = anonymous_user

        return context

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            print("Error creating proposal:", e)
            raise



from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q

from .models import Project, Skill
from apps.proposals.models import ProjectProposal
from .serializers import ProjectSerializer, SkillSerializer, ProposalSerializer
from django.contrib.auth import get_user_model


# =========================
# SKILLS
# =========================
class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by("name")
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# =========================
# PROPOSALS
# =========================
class ProposalViewSet(viewsets.ModelViewSet):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Freelancer sees only HIS proposals
        return ProjectProposal.objects.filter(freelancer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)


# =========================
# PROJECTS (MAIN FIX)
# =========================
class ProjectViewSet(viewsets.ModelViewSet):
    """
    Single endpoint: /api/projects/

    - Client:
        • sees ONLY projects created by him
    - Freelancer:
        • sees marketplace-ready projects
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description", "required_skills"]

    def get_queryset(self):
        user = self.request.user

        # ---------- CLIENT ----------
        if user.role == "client":
            return Project.objects.filter(
                client=user
            ).order_by("-created_at")

        # ---------- FREELANCER ----------
        if user.role == "freelancer":
            # Surfacing all client-visible listings keeps filters useful for freelancers
            return Project.objects.filter(
                status__in=["Open", "Pending", "Active"],
                freelancer__isnull=True
            ).order_by("-created_at")

        return Project.objects.none()

    def perform_create(self, serializer):
        """
        Client creates project:
        - freelancer MUST be NULL
        - status MUST be Open
        """
        project = serializer.save(
            client=self.request.user,
            freelancer=None,
            status="Open"
        )

        # Notify all freelancers when a project is posted
        try:
            from apps.notifications.models import create_notification_bulk

            freelancers = get_user_model().objects.filter(role="freelancer")
            if freelancers.exists():
                create_notification_bulk(
                    users=freelancers,
                    verb="project_posted",
                    title="New project posted",
                    body=project.title,
                    actor=self.request.user,
                    target_type="project",
                    target_id=project.id,
                    metadata={"project_id": project.id},
                )
        except Exception:
            # Keep project creation resilient even if notifications fail
            pass


# =========================
# OPTIONAL: MARKETPLACE (NOT REQUIRED)
# =========================
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def get_open_projects(request):
    """
    OPTIONAL endpoint (not used since projects/ handles it)
    """
    projects = Project.objects.filter(
        status__iexact="Open",
        freelancer__isnull=True
    ).order_by("-created_at")

    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

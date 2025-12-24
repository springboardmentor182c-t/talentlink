from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count
from django.db.models.functions import TruncDate
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .models import Project
from .serializers import (
    ProjectSerializer,
    ProposalsPerProjectSerializer,
    FreelancersPerSkillSerializer,
    ProjectActivitySerializer,
)

from apps.proposals.models import ProjectProposal
from apps.freelancers.models import FreelancerProfile


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer


@method_decorator(cache_page(60), name="dispatch")
class ProposalsPerProjectAPIView(APIView):
    """Return number of proposals received per project."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        # aggregate proposals by project_id
        proposals_agg = (
            ProjectProposal.objects.values("project_id")
            .annotate(proposal_count=Count("id"))
        )

        counts = {item["project_id"]: item["proposal_count"] for item in proposals_agg}

        # If user is staff, return all projects; otherwise limit to projects
        # that belong to this client (detected via proposals.client)
        if request.user.is_staff or request.user.is_superuser:
            projects_qs = Project.objects.all()
        else:
            client_project_ids = (
                ProjectProposal.objects.filter(client=request.user).values_list("project_id", flat=True).distinct()
            )
            projects_qs = Project.objects.filter(id__in=client_project_ids)

        data_list = []
        for project in projects_qs:
            data_list.append({
                "project_id": project.id,
                "title": project.title,
                "proposal_count": counts.get(project.id, 0),
            })

        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(data_list, request)
        if page is not None:
            serializer = ProposalsPerProjectSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = ProposalsPerProjectSerializer(data_list, many=True)
        return Response(serializer.data)


@method_decorator(cache_page(60), name="dispatch")
class FreelancersPerSkillAPIView(APIView):
    """Return number of freelancers for each skill (skills parsed from comma-separated field)."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        skill_map = {}
        profiles = FreelancerProfile.objects.all()
        for p in profiles:
            if not p.skills:
                continue
            for raw in p.skills.split(","):
                skill = raw.strip()
                if not skill:
                    continue
                key = skill.lower()
                if key not in skill_map:
                    skill_map[key] = {"skill": skill, "freelancers": set()}
                skill_map[key]["freelancers"].add(p.user_id)

        data_list = []
        for key, val in skill_map.items():
            data_list.append({"skill": val["skill"], "freelancer_count": len(val["freelancers"])})

        data_list.sort(key=lambda x: x["freelancer_count"], reverse=True)

        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(data_list, request)
        if page is not None:
            serializer = FreelancersPerSkillSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = FreelancersPerSkillSerializer(data_list, many=True)
        return Response(serializer.data)


@method_decorator(cache_page(60), name="dispatch")
class ProjectActivityAPIView(APIView):
    """Return activity timeline for a given project: proposals per day.

    Query params:
    - project_id (required): integer
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        project_id = request.query_params.get("project_id")
        if not project_id:
            return Response({"detail": "project_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Only allow access if requester is staff or is the client for this project
        is_client = ProjectProposal.objects.filter(project_id=project_id, client=request.user).exists()
        if not (request.user.is_staff or request.user.is_superuser or is_client):
            return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        qs = ProjectProposal.objects.filter(project_id=project_id)
        timeline = (
            qs.annotate(date=TruncDate("created_at")).values("date").annotate(count=Count("id")).order_by("date")
        )

        data = [{"date": item["date"], "proposal_count": item["count"]} for item in timeline]
        serializer = ProjectActivitySerializer({"project_id": int(project_id), "timeline": data})
        return Response(serializer.data)

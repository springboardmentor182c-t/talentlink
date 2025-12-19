
from django.contrib.auth import get_user_model
import logging
from django.conf import settings
from rest_framework import viewsets, generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import ProjectProposal, ProposalAttachment
from .serializers import ProposalSerializer, ProposalAttachmentSerializer

User = get_user_model()

class ProposalViewSet(viewsets.ModelViewSet):
    queryset = ProjectProposal.objects.all().order_by("-created_at")
    serializer_class = ProposalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        project_id = self.request.query_params.get("project_id")
        if project_id:
            try:
                pid = int(project_id)
            except (ValueError, TypeError):
                logging.warning("Invalid project_id filter: %s", project_id)
                return self.queryset.none()
            return self.queryset.filter(project_id=pid)
        return self.queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = ProposalSerializer(page, many=True, context=self.get_serializer_context())
                return self.get_paginated_response(serializer.data)
            serializer = ProposalSerializer(queryset, many=True, context=self.get_serializer_context())
            return Response(serializer.data)
        except Exception as e:
            logging.exception("Error listing proposals")
            if getattr(settings, "DEBUG", False):
                return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({"detail": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _ensure_client(self, request, proposal):
        if proposal.client != request.user:
            return Response({"detail": "Only the client can update this proposal."}, status=status.HTTP_403_FORBIDDEN)
        return None

    @action(detail=True, methods=["post"])
    def consider(self, request, pk=None):
        proposal = self.get_object()
        forbidden = self._ensure_client(request, proposal)
        if forbidden:
            return forbidden
        proposal.status = "considering"
        proposal.save(update_fields=["status"])
        return Response({"message": "Proposal marked as considering"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def accept(self, request, pk=None):
        proposal = self.get_object()
        forbidden = self._ensure_client(request, proposal)
        if forbidden:
            return forbidden

        already_accepted = ProjectProposal.objects.filter(
            client=proposal.client,
            project_title=proposal.project_title,
            status="accepted",
        ).exclude(id=proposal.id).exists()
        if already_accepted:
            return Response(
                {"detail": "A proposal for this project is already accepted."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        proposal.status = "accepted"
        proposal.save(update_fields=["status"])
        return Response({"message": "Proposal accepted"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        proposal = self.get_object()
        forbidden = self._ensure_client(request, proposal)
        if forbidden:
            return forbidden
        proposal.status = "rejected"
        proposal.save(update_fields=["status"])
        return Response({"message": "Proposal rejected"}, status=status.HTTP_200_OK)

class ProposalCreateView(generics.CreateAPIView):
    queryset = ProjectProposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [AllowAny]

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


class ProposalAttachmentUploadView(generics.CreateAPIView):
    serializer_class = ProposalAttachmentSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def post(self, request, proposal_id, *args, **kwargs):
        proposal = get_object_or_404(ProjectProposal, id=proposal_id)
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'detail': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        attachment = ProposalAttachment.objects.create(proposal=proposal, file=file_obj)
        serializer = self.get_serializer(attachment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import ProjectProposal
from .serializers import ProposalSerializer


class ProposalViewSet(viewsets.ModelViewSet):
    queryset = ProjectProposal.objects.all().order_by("-created_at")
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)

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

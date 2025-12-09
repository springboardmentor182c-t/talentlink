from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ProjectProposal
from .serializers import ProposalSerializer


class ProposalViewSet(viewsets.ModelViewSet):
    queryset = ProjectProposal.objects.all().order_by("-created_at")
    serializer_class = ProposalSerializer
    # permission_classes = [IsAuthenticated]  # Temporarily disabled for testing

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)

    def accept(self, request, pk=None):
        proposal = self.get_object()
        proposal.status = "accepted"
        proposal.save()
        return Response({"message": "Proposal accepted"}, status=200)

    def reject(self, request, pk=None):
        proposal = self.get_object()
        proposal.status = "rejected"
        proposal.save()
        return Response({"message": "Proposal rejected"}, status=200)

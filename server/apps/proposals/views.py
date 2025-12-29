 Group-C-feature/projectproposal-Ambika-clean
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ProjectProposal




from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Proposal
 main-group-C
from .serializers import ProposalSerializer

# --- EXISTING VIEWS (Unchanged) ---

class ProposalListCreateView(generics.ListCreateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

 Group-C-feature/projectproposal-Ambika-clean
class ProposalViewSet(viewsets.ModelViewSet):
    queryset = ProjectProposal.objects.all().order_by("-created_at")
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

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

    def get_queryset(self):
        user = self.request.user
        return Proposal.objects.filter(
            Q(freelancer=user) | Q(project__client=user)
        ).distinct()

    def perform_create(self, serializer):
        serializer.save(
            freelancer=self.request.user,  # ✅ CORRECT
            status='sent'
        )


class ProposalDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET, PUT, DELETE a specific proposal.
    """
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Security: Only allow access if user is involved in the proposal
        user = self.request.user
        return Proposal.objects.filter(
            Q(freelancer=user) | Q(project__client=user)
        )

class AcceptProposalView(APIView):
    """
    POST: Mark a proposal as 'accepted'.
    This triggers the logic needed for Contracts and Messaging permissions.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        proposal = get_object_or_404(Proposal, pk=pk)

        # Security Check: Only the Client who owns the project can accept
        if proposal.project.client != request.user:
            return Response(
                {"detail": "You do not have permission to accept this proposal."}, 
                status=status.HTTP_403_FORBIDDEN
            )

        # Update Status
        proposal.status = 'accepted'
        proposal.save()

        return Response({
            "message": "Proposal accepted.",
            "status": "accepted",
            "project_id": proposal.project.id,
            "freelancer_id": proposal.freelancer.id
        }, status=status.HTTP_200_OK)

class ReceivedProposalsList(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        return (
            Proposal.objects
            .filter(project__client=user)
            .exclude(freelancer__isnull=True)
            .select_related("project", "freelancer")
            .order_by("-created_at")
        )

# --- NEW VIEW ADDED BELOW ---

class HireProposalView(APIView):
    """
    POST: Mark a proposal as 'Hired'.
    Call this view immediately after creating a contract to update the proposal status.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        proposal = get_object_or_404(Proposal, pk=pk)

        # 1. Security Check: Only the Client who owns the project can hire
        if proposal.project.client != request.user:
            return Response(
                {"detail": "You do not have permission to hire for this proposal."}, 
                status=status.HTTP_403_FORBIDDEN
            )

        # 2. Update Status to 'Hired'
        proposal.status = 'Hired'
        proposal.save()

        return Response({
            "message": "Freelancer hired successfully.",
            "status": "Hired",
            "proposal_id": proposal.id
        }, status=status.HTTP_200_OK)
 main-group-C

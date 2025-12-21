# # from django.shortcuts import render

# # # Create your views here.



# from rest_framework import generics, permissions, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404
# from django.db.models import Q
# from .models import Proposal
# from .serializers import ProposalSerializer

# class ProposalListCreateView(generics.ListCreateAPIView):
#     """
#     GET: List all proposals relevant to the user (Sent by me OR Received by me).
#     POST: Create a new proposal (for Freelancers).
#     """
#     serializer_class = ProposalSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         # Return proposals where I am the freelancer OR where I am the client of the project
#         return Proposal.objects.filter(
#             Q(freelancer=user) | Q(project__client=user)
#         ).distinct()

#     def perform_create(self, serializer):
#         # Automatically set the logged-in user as the freelancer
#         serializer.save(freelancer=self.request.user, status='sent')

# class ProposalDetailView(generics.RetrieveUpdateDestroyAPIView):
#     """
#     GET, PUT, DELETE a specific proposal.
#     """
#     queryset = Proposal.objects.all()
#     serializer_class = ProposalSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         # Security: Only allow access if user is involved in the proposal
#         user = self.request.user
#         return Proposal.objects.filter(
#             Q(freelancer=user) | Q(project__client=user)
#         )

# class AcceptProposalView(APIView):
#     """
#     POST: Mark a proposal as 'accepted'.
#     This triggers the logic needed for Contracts and Messaging permissions.
#     """
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request, pk):
#         proposal = get_object_or_404(Proposal, pk=pk)

#         # Security Check: Only the Client who owns the project can accept
#         if proposal.project.client != request.user:
#             return Response(
#                 {"detail": "You do not have permission to accept this proposal."}, 
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         # Update Status
#         proposal.status = 'accepted'
#         proposal.save()

#         return Response({
#             "message": "Proposal accepted.",
#             "status": "accepted",
#             "project_id": proposal.project.id,
#             "freelancer_id": proposal.freelancer.id
#         }, status=status.HTTP_200_OK)


from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Proposal
from .serializers import ProposalSerializer

class ProposalListCreateView(generics.ListCreateAPIView):
    """
    GET: List all proposals relevant to the user (Sent by me OR Received by me).
    POST: Create a new proposal (for Freelancers).
    """
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Return proposals where I am the freelancer OR where I am the client of the project
        return Proposal.objects.filter(
            Q(freelancer=user) | Q(project__client=user)
        ).distinct()

    def perform_create(self, serializer):
        # Automatically set the logged-in user as the freelancer
        serializer.save(freelancer=self.request.user, status='sent')

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

# --- NEW VIEW FOR CLIENT RECEIVED PROPOSALS ---
class ReceivedProposalsList(generics.ListAPIView):
    """
    Returns a list of proposals sent to projects owned by the logged-in client.
    """
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter: Show proposals where the related project's client is the current user
        return Proposal.objects.filter(project__client=self.request.user).select_related('project', 'freelancer')
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.db.models import Q

from .models import Proposal
from .serializers import ProposalSerializer, ProposalCreateSerializer


class ProposalViewSet(viewsets.ModelViewSet):
    """
    API endpoints for Proposal CRUD operations.
    
    GET /api/v1/proposals/ - List all proposals for the freelancer
    POST /api/v1/proposals/ - Create a new proposal
    GET /api/v1/proposals/{id}/ - Get a specific proposal
    PUT/PATCH /api/v1/proposals/{id}/ - Update a proposal
    DELETE /api/v1/proposals/{id}/ - Delete a proposal
    """
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ProposalCreateSerializer
        return ProposalSerializer
    
    def get_queryset(self):
        """Return proposals for the logged-in user (as freelancer)"""
        user = self.request.user
        return Proposal.objects.filter(freelancer=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        """Automatically set the freelancer to the logged-in user"""
        serializer.save(freelancer=self.request.user)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """
        Update the status of a proposal.
        PATCH /api/v1/proposals/{id}/update_status/
        Body: {"status": "accepted" | "rejected"}
        """
        proposal = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in ['pending', 'accepted', 'rejected']:
            return Response(
                {'error': 'Invalid status. Must be pending, accepted, or rejected.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        proposal.status = new_status
        proposal.save()
        
        serializer = self.get_serializer(proposal)
        return Response(serializer.data)


class ProposalListView(generics.ListCreateAPIView):
    """
    List and create proposals for the freelancer.
    """
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProposalCreateSerializer
        return ProposalSerializer
    
    def get_queryset(self):
        user = self.request.user
        status_filter = self.request.query_params.get('status')
        
        # Proposals where the user is the freelancer
        qs = Proposal.objects.filter(freelancer=user).order_by('-created_at')
        
        if status_filter:
            qs = qs.filter(status=status_filter)
        
        return qs
    
    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)


class ProposalDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a specific proposal.
    """
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Proposal.objects.filter(freelancer=user)


class ClientProposalsView(generics.ListAPIView):
    """
    List proposals received by a client from freelancers.
    GET /api/v1/proposals/client-proposals/
    """
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        status_filter = self.request.query_params.get('status')
        
        # Proposals where the user is the client
        qs = Proposal.objects.filter(client=user).order_by('-created_at')
        
        if status_filter:
            qs = qs.filter(status=status_filter)
        
        return qs

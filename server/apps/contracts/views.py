from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import transaction, models
from django.utils import timezone

from .models import Contract, ContractMilestone, ContractActivity
from .serializers import (
    ContractSerializer, 
    ContractMilestoneSerializer,
    ContractActivitySerializer,
    ContractCreateFromProposalSerializer,
    ContractStatusUpdateSerializer,
    ContractPaymentSerializer
)


class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    # permission_classes = [IsAuthenticated]  # Disabled for mock authentication

    def get_queryset(self):
        user = self.request.user
        
        # For anonymous users or testing, return all contracts
        if not user.is_authenticated:
            queryset = Contract.objects.all()
            
            # For anonymous users, only apply role filter if we have test data
            role = self.request.query_params.get('role')
            if role == 'freelancer':
                # For testing, return contracts where freelancer is the test freelancer user
                from django.contrib.auth.models import User
                freelancer_user = User.objects.filter(username='freelancer_test').first()
                if freelancer_user:
                    queryset = queryset.filter(freelancer=freelancer_user)
                else:
                    queryset = Contract.objects.none()  # Return empty queryset if no test user
            elif role == 'client':
                # For testing, return contracts where client is the admin user
                from django.contrib.auth.models import User
                admin_user = User.objects.filter(username='admin').first()
                if admin_user:
                    queryset = queryset.filter(client=admin_user)
                else:
                    queryset = Contract.objects.none()
        else:
            queryset = Contract.objects.filter(
                models.Q(freelancer=user) | models.Q(client=user)
            ).distinct()
            
            # Filter by user role for authenticated users
            role = self.request.query_params.get('role')
            if role == 'freelancer':
                queryset = queryset.filter(freelancer=user)
            elif role == 'client':
                queryset = queryset.filter(client=user)
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by contract type
        contract_type = self.request.query_params.get('contract_type')
        if contract_type:
            queryset = queryset.filter(contract_type=contract_type)
        
        # Search by title or description
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) | 
                models.Q(description__icontains=search)
            )
        
        return queryset

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['post'], url_path='create-from-proposal')
    def create_from_proposal(self, request):
        """Create a contract from an accepted proposal"""
        serializer = ContractCreateFromProposalSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                contract = serializer.save()
                # Return the created contract with full serializer
                contract_serializer = ContractSerializer(contract)
                return Response(contract_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='update-status')
    def update_status(self, request, pk=None):
        """Update contract status with validation and activity logging"""
        contract = self.get_object()
        serializer = ContractStatusUpdateSerializer(contract, data=request.data)
        
        if serializer.is_valid():
            new_status = serializer.validated_data['status']
            note = serializer.validated_data.get('note', '')
            
            with transaction.atomic():
                old_status = contract.status
                contract.status = new_status
                
                # Update timestamps based on status
                if new_status == 'active' and old_status != 'active':
                    contract.signed_at = timezone.now()
                elif new_status == 'completed' and old_status != 'completed':
                    contract.completed_at = timezone.now()
                    contract.progress_percentage = 100
                
                contract.save()
                
                # Create activity log
                activity_description = f"Status changed from '{old_status}' to '{new_status}'"
                if note:
                    activity_description += f": {note}"
                    
                ContractActivity.objects.create(
                    contract=contract,
                    user=request.user,
                    activity_type="status_changed",
                    description=activity_description
                )
            
            # Return updated contract
            contract_serializer = ContractSerializer(contract)
            return Response(contract_serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='make-payment')
    def make_payment(self, request, pk=None):
        """Process contract payment"""
        contract = self.get_object()
        serializer = ContractPaymentSerializer(contract, data=request.data)
        
        if serializer.is_valid():
            amount = serializer.validated_data['amount']
            payment_type = serializer.validated_data['payment_type']
            milestone_id = serializer.validated_data.get('milestone_id')
            note = serializer.validated_data.get('note', '')
            
            if amount > contract.remaining_amount:
                return Response(
                    {"error": "Payment amount exceeds remaining contract amount"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            with transaction.atomic():
                if payment_type == "escrow":
                    contract.amount_in_escrow += amount
                else:  # direct payment
                    contract.amount_paid += amount
                    
                    # Update milestone if specified
                    if milestone_id:
                        milestone = ContractMilestone.objects.get(id=milestone_id)
                        milestone.status = "paid"
                        milestone.save()
                
                contract.save()
                
                # Create activity log
                payment_description = f"Payment of ${amount} made"
                if payment_type == "escrow":
                    payment_description += " (to escrow)"
                if note:
                    payment_description += f": {note}"
                    
                ContractActivity.objects.create(
                    contract=contract,
                    user=request.user,
                    activity_type="payment_made",
                    description=payment_description
                )
            
            # Return updated contract
            contract_serializer = ContractSerializer(contract)
            return Response(contract_serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='release-escrow')
    def release_escrow(self, request, pk=None):
        """Release escrow funds to freelancer"""
        contract = self.get_object()
        amount = request.data.get('amount', contract.amount_in_escrow)
        
        if amount > contract.amount_in_escrow:
            return Response(
                {"error": "Release amount exceeds escrow balance"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        with transaction.atomic():
            contract.amount_in_escrow -= amount
            contract.amount_paid += amount
            contract.save()
            
            # Create activity log
            ContractActivity.objects.create(
                contract=contract,
                user=request.user,
                activity_type="payment_made",
                description=f"Escrow release of ${amount} to freelancer"
            )
        
        # Return updated contract
        contract_serializer = ContractSerializer(contract)
        return Response(contract_serializer.data)

    @action(detail=True, methods=['get'], url_path='activities')
    def get_activities(self, request, pk=None):
        """Get contract activity timeline"""
        contract = self.get_object()
        activities = contract.activities.all()
        serializer = ContractActivitySerializer(activities, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='add-milestone')
    def add_milestone(self, request, pk=None):
        """Add a milestone to the contract"""
        contract = self.get_object()
        serializer = ContractMilestoneSerializer(data=request.data)
        
        if serializer.is_valid():
            milestone = serializer.save(contract=contract)
            
            # Create activity log
            ContractActivity.objects.create(
                contract=contract,
                user=request.user,
                activity_type="note_added",
                description=f"Milestone added: {milestone.title}"
            )
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='download')
    def download_contract(self, request, pk=None):
        """Download contract as PDF (placeholder for now)"""
        contract = self.get_object()
        
        # This would integrate with a PDF generation library
        # For now, return contract data as JSON
        serializer = ContractSerializer(contract)
        return Response({
            "message": "Contract download functionality will be implemented",
            "contract_data": serializer.data
        })


class ContractMilestoneViewSet(viewsets.ModelViewSet):
    queryset = ContractMilestone.objects.all()
    serializer_class = ContractMilestoneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ContractMilestone.objects.filter(
            models.Q(contract__freelancer=user) | models.Q(contract__client=user)
        ).distinct()

    @action(detail=True, methods=['post'], url_path='complete')
    def complete_milestone(self, request, pk=None):
        """Mark milestone as completed"""
        milestone = self.get_object()
        
        if milestone.status not in ['pending', 'in_progress']:
            return Response(
                {"error": "Milestone cannot be completed in current status"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        with transaction.atomic():
            milestone.status = 'completed'
            milestone.completed_at = timezone.now()
            milestone.save()
            
            # Create activity log
            ContractActivity.objects.create(
                contract=milestone.contract,
                user=request.user,
                activity_type="milestone_completed",
                description=f"Milestone completed: {milestone.title}"
            )
        
        serializer = ContractMilestoneSerializer(milestone)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='approve')
    def approve_milestone(self, request, pk=None):
        """Approve milestone (client only)"""
        milestone = self.get_object()
        
        if milestone.status != 'completed':
            return Response(
                {"error": "Only completed milestones can be approved"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if request.user != milestone.contract.client:
            return Response(
                {"error": "Only client can approve milestones"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        with transaction.atomic():
            milestone.status = 'approved'
            milestone.approved_at = timezone.now()
            milestone.save()
            
            # Create activity log
            ContractActivity.objects.create(
                contract=milestone.contract,
                user=request.user,
                activity_type="milestone_approved",
                description=f"Milestone approved: {milestone.title}"
            )
        
        serializer = ContractMilestoneSerializer(milestone)
        return Response(serializer.data)
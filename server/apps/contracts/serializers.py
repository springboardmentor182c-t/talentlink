from rest_framework import serializers
from .models import Contract, ContractMilestone, ContractActivity
from apps.proposals.models import ProjectProposal
from apps.proposals.serializers import ProposalSerializer


class ContractMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractMilestone
        fields = [
            "id",
            "title",
            "description",
            "amount",
            "due_date",
            "status",
            "order",
            "created_at",
            "completed_at",
            "approved_at",
        ]
        read_only_fields = ["id", "created_at", "completed_at", "approved_at"]


class ContractActivitySerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.username", read_only=True)
    activity_type_display = serializers.CharField(source="get_activity_type_display", read_only=True)

    class Meta:
        model = ContractActivity
        fields = [
            "id",
            "activity_type",
            "activity_type_display",
            "description",
            "user",
            "user_name",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class ContractSerializer(serializers.ModelSerializer):
    freelancer_name = serializers.CharField(source="freelancer.username", read_only=True)
    client_name = serializers.CharField(source="client.username", read_only=True)
    proposal_details = ProposalSerializer(source="proposal", read_only=True)
    milestones = ContractMilestoneSerializer(many=True, read_only=True)
    activities = ContractActivitySerializer(many=True, read_only=True)
    
    remaining_amount = serializers.ReadOnlyField()
    payment_progress_percentage = serializers.ReadOnlyField()
    is_overdue = serializers.ReadOnlyField()

    class Meta:
        model = Contract
        fields = [
            "id",
            "proposal",
            "proposal_details",
            "freelancer",
            "freelancer_name",
            "client",
            "client_name",
            "title",
            "description",
            "contract_type",
            "total_amount",
            "hourly_rate",
            "max_hours",
            "amount_paid",
            "amount_in_escrow",
            "remaining_amount",
            "payment_progress_percentage",
            "start_date",
            "end_date",
            "expected_delivery_date",
            "status",
            "progress_percentage",
            "is_overdue",
            "requirements",
            "deliverables",
            "terms_and_conditions",
            "milestones",
            "activities",
            "created_at",
            "updated_at",
            "signed_at",
            "completed_at",
        ]
        read_only_fields = [
            "id", "created_at", "updated_at", "signed_at", "completed_at",
            "amount_paid", "amount_in_escrow", "progress_percentage"
        ]

    def validate(self, data):
        # Validate dates
        if data.get('start_date') and data.get('end_date'):
            if data['start_date'] >= data['end_date']:
                raise serializers.ValidationError("End date must be after start date.")
        
        # Validate contract type specific fields
        if data.get('contract_type') == 'hourly':
            if not data.get('hourly_rate'):
                raise serializers.ValidationError("Hourly rate is required for hourly contracts.")
            if not data.get('max_hours'):
                raise serializers.ValidationError("Max hours is required for hourly contracts.")
        
        # Validate total amount
        if data.get('total_amount') and data['total_amount'] <= 0:
            raise serializers.ValidationError("Total amount must be greater than zero.")
        
        return data


class ContractCreateFromProposalSerializer(serializers.Serializer):
    proposal_id = serializers.IntegerField()
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    expected_delivery_date = serializers.DateField(required=False)
    requirements = serializers.CharField(required=False, allow_blank=True)
    deliverables = serializers.CharField(required=False, allow_blank=True)
    terms_and_conditions = serializers.CharField(required=False, allow_blank=True)

    def validate_proposal_id(self, value):
        try:
            proposal = ProjectProposal.objects.get(id=value)
            if proposal.status != "accepted":
                raise serializers.ValidationError("Proposal must be accepted to create a contract.")
            if hasattr(proposal, 'contract'):
                raise serializers.ValidationError("A contract already exists for this proposal.")
        except ProjectProposal.DoesNotExist:
            raise serializers.ValidationError("Proposal not found.")
        return value

    def validate(self, data):
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError("End date must be after start date.")
        return data

    def create(self, validated_data):
        proposal = ProjectProposal.objects.get(id=validated_data['proposal_id'])
        
        # Create contract from proposal
        contract = Contract.objects.create(
            proposal=proposal,
            freelancer=proposal.freelancer,
            client=proposal.client,
            title=proposal.project_title,
            description=proposal.description,
            total_amount=proposal.bid_amount,
            contract_type="fixed",  # Default to fixed price from proposal
            start_date=validated_data['start_date'],
            end_date=validated_data['end_date'],
            expected_delivery_date=validated_data.get('expected_delivery_date'),
            requirements=validated_data.get('requirements', ''),
            deliverables=validated_data.get('deliverables', ''),
            terms_and_conditions=validated_data.get('terms_and_conditions', ''),
            status="pending"  # Start in pending status
        )
        
        # Create activity log
        ContractActivity.objects.create(
            contract=contract,
            user=proposal.client,
            activity_type="created",
            description=f"Contract created from accepted proposal"
        )
        
        return contract


class ContractStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Contract.STATUS_CHOICES)
    note = serializers.CharField(required=False, allow_blank=True)

    def validate_status(self, value):
        current_status = self.instance.status if self.instance else None
        
        # Define valid status transitions
        valid_transitions = {
            'draft': ['pending', 'cancelled'],
            'pending': ['active', 'cancelled'],
            'active': ['in_review', 'completed', 'cancelled', 'disputed'],
            'in_review': ['completed', 'active', 'disputed'],
            'completed': [],
            'cancelled': [],
            'disputed': ['active', 'cancelled', 'completed']
        }
        
        if current_status and value not in valid_transitions.get(current_status, []):
            raise serializers.ValidationError(
                f"Cannot change status from '{current_status}' to '{value}'"
            )
        
        return value


class ContractPaymentSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    payment_type = serializers.ChoiceField(choices=["escrow", "direct"])
    milestone_id = serializers.IntegerField(required=False)
    note = serializers.CharField(required=False, allow_blank=True)

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Payment amount must be greater than zero.")
        return value

    def validate(self, data):
        if data.get('milestone_id'):
            try:
                milestone = ContractMilestone.objects.get(id=data['milestone_id'])
                if milestone.contract != self.instance:
                    raise serializers.ValidationError("Milestone does not belong to this contract.")
                if milestone.amount != data['amount']:
                    raise serializers.ValidationError("Payment amount must match milestone amount.")
            except ContractMilestone.DoesNotExist:
                raise serializers.ValidationError("Milestone not found.")
        return data
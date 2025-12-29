
from rest_framework import serializers
 Group-C-feature/projectproposal-Ambika-clean
from .models import ProjectProposal


class ProposalSerializer(serializers.ModelSerializer):
    freelancer_name = serializers.CharField(source="freelancer.username", read_only=True)
    client_name = serializers.CharField(source="client.username", read_only=True)

    class Meta:
        model = ProjectProposal
        fields = [
            "id",
            "freelancer",
            "freelancer_name",
            "client",
            "client_name",
            "project_title",
            "description",
            "bid_amount",
            "status",
            "created_at",
        ]
        read_only_fields = ["status", "created_at"]

from django.db import IntegrityError
from .models import Proposal
from apps.projects.models import Project
from django.contrib.auth import get_user_model

User = get_user_model()


class ProposalSerializer(serializers.ModelSerializer):
    # --- Read-only display fields ---
    freelancer_name = serializers.ReadOnlyField(source='freelancer.first_name')
    project_title = serializers.ReadOnlyField(source='project.title')
    client_name = serializers.ReadOnlyField(source='project.client.first_name')

    # --- Frontend compatibility fields ---
    job_title = serializers.ReadOnlyField(source='project.title')
    client_id = serializers.ReadOnlyField(source='project.client.id')
    freelancer_id = serializers.ReadOnlyField(source='freelancer.id')

    class Meta:
        model = Proposal
        fields = [
            'id',
            'project',
            'project_title',
            'job_title',
            'freelancer',
            'freelancer_id',
            'freelancer_name',
            'client_name',
            'client_id',
            'cover_letter',
            'bid_amount',
            'estimated_days',
            'status',
            'created_at',
        ]
        read_only_fields = ['freelancer', 'status', 'created_at']

    # ------------------------------------------------------------------
    # VALIDATIONS (THIS PREVENTS IntegrityError)
    # ------------------------------------------------------------------
    def validate(self, attrs):
        request = self.context.get('request')
        project = attrs.get('project')

        if not project:
            raise serializers.ValidationError("Project is required.")

        # ❌ Prevent freelancer from applying to own project
        if project.client == request.user:
            raise serializers.ValidationError(
                "You cannot apply to your own project."
            )

        return attrs

    # ------------------------------------------------------------------
    # SAFE CREATE (HANDLES DUPLICATE PROPOSALS)
    # ------------------------------------------------------------------
    def create(self, validated_data):
        try:
            return Proposal.objects.create(**validated_data)
        except IntegrityError:
            # This happens when unique constraint is violated
            raise serializers.ValidationError(
                "You have already applied to this project."
            )
 main-group-C

from rest_framework import serializers
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

from rest_framework import serializers
from .models import ProjectProposal, ProposalAttachment
from django.contrib.auth import get_user_model

User = get_user_model()

class FreelancerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]

class ProposalSerializer(serializers.ModelSerializer):
    freelancer = FreelancerSerializer(read_only=True)

    class Meta:
        model = ProjectProposal
        fields = [
            "id",
            "freelancer",
            "client",
            "project_id",
            "bid_amount",
            "completion_time",
            "cover_letter",
            "status",
            "created_at",
        ]
        read_only_fields = ["freelancer", "status", "created_at"]

    def create(self, validated_data):
        freelancer = self.context.get("freelancer")
        if freelancer:
            validated_data["freelancer"] = freelancer
        return super().create(validated_data)


class ProposalAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalAttachment
        fields = ['id', 'proposal', 'file', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']

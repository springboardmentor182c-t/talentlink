from rest_framework import serializers

from .models import FreelancerProfile


class FreelancerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = FreelancerProfile
        fields = [
            "id",
            "user",
            "username",
            "title",
            "bio",
            "skills",
            "hourly_rate",
            "location",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user", "created_at", "updated_at"]

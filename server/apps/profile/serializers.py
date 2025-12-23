from rest_framework import serializers
from .models import FreelancerProfile, ClientProfile


class FreelancerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = FreelancerProfile
        fields = [
            "id",
            "user",
            "username",
            "email",
            "first_name",
            "last_name",
            "title",
            "bio",
            "skills",
            "hourly_rate",
            "location",
            "languages",
            "portfolio_links",
            "availability",
            "profile_image",
            "documents",
            "profile_completeness",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user", "profile_completeness", "created_at", "updated_at"]


class ClientProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = ClientProfile
        fields = [
            "id",
            "user",
            "username",
            "email",
            "first_name",
            "last_name",
            "company_name",
            "company_description",
            "website",
            "phone",
            "location",
            "country",
            "bio",
            "profile_image",
            "documents",
            "profile_completeness",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user", "profile_completeness", "created_at", "updated_at"]

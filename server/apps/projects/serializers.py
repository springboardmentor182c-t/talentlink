from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = []
        extra_kwargs = {"client_name": {"read_only": True}}

    def get_client_name(self, obj):
        if obj.client:
            first = getattr(obj.client, 'first_name', '').strip()
            last = getattr(obj.client, 'last_name', '').strip()
            if first or last:
                return f"{first} {last}".strip()
            username = getattr(obj.client, 'username', '').strip()
            if username:
                return username
            return getattr(obj.client, 'email', '')
        return ""

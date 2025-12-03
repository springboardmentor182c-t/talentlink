from rest_framework import serializers
from .models import FreelancerProfile

class FreelancerProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = FreelancerProfile
        fields = [
            'id', 
            'user', 
            'project_title', 
            'description', 
            'budget', 
            'required_skills', 
            'status', 
            'experience_years', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        if FreelancerProfile.objects.filter(user=user).exists():
            raise serializers.ValidationError("You already have a profile created.")
        return super().create(validated_data)
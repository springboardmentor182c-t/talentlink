from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ProposalsPerProjectSerializer(serializers.Serializer):
    project_id = serializers.IntegerField()
    title = serializers.CharField()
    proposal_count = serializers.IntegerField()


class FreelancersPerSkillSerializer(serializers.Serializer):
    skill = serializers.CharField()
    freelancer_count = serializers.IntegerField()


class ProjectActivityPointSerializer(serializers.Serializer):
    date = serializers.DateField()
    proposal_count = serializers.IntegerField()


class ProjectActivitySerializer(serializers.Serializer):
    project_id = serializers.IntegerField()
    timeline = ProjectActivityPointSerializer(many=True)

from rest_framework import serializers

class ProjectsPerSkillSerializer(serializers.Serializer):
    skill = serializers.CharField()
    count = serializers.IntegerField()

class RecentProjectSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    status = serializers.CharField()
    created_at = serializers.DateTimeField()

class RecentProposalSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    project_id = serializers.IntegerField()
    status = serializers.CharField()
    created_at = serializers.DateTimeField()

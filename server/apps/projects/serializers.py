from rest_framework import serializers
from .models import Project, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']


class ProjectSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        many=True,
        required=False,
        source='skills'
    )
    
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'status',
            'created_at',
            'skills',
            'skill_ids',
            'freelancer'
        ]
        read_only_fields = ['id', 'created_at', 'freelancer']

    def create(self, validated_data):
        skills = validated_data.pop('skills', [])
        project = Project.objects.create(**validated_data)
        project.skills.set(skills)
        return project

    def update(self, instance, validated_data):
        skills = validated_data.pop('skills', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if skills is not None:
            instance.skills.set(skills)
        instance.save()
        return instance

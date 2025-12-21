from rest_framework import serializers
from .models import Project, Skill
# IMPORT PROPOSAL FROM THE OTHER APP
from apps.proposals.models import Proposal 

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class ProjectSerializer(serializers.ModelSerializer):
    client_name = serializers.ReadOnlyField(source='client.username')
    freelancer_name = serializers.ReadOnlyField(source='freelancer.username')

    class Meta:
        model = Project
        fields = [
            'id', 'client', 'client_name', 'freelancer', 'freelancer_name',
            'title', 'description', 'budget', 'deadline', 
            'experience_years', 'required_skills', 'status', 'created_at'
        ]
        read_only_fields = ['client', 'created_at']

class ProposalSerializer(serializers.ModelSerializer):
    freelancer_name = serializers.ReadOnlyField(source='freelancer.username')
    project_title = serializers.ReadOnlyField(source='project.title')

    class Meta:
        model = Proposal
        fields = [
            'id', 'project', 'project_title', 
            'freelancer', 'freelancer_name', 
            'cover_letter', 'bid_amount', 
            'status', 'created_at'
        ]
        read_only_fields = ['freelancer', 'status', 'created_at']
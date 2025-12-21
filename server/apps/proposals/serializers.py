# from rest_framework import serializers
# from .models import Proposal
# from apps.projects.models import Project
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class ProposalSerializer(serializers.ModelSerializer):
#     freelancer_name = serializers.ReadOnlyField(source='freelancer.first_name')
#     project_title = serializers.ReadOnlyField(source='project.title')
#     client_name = serializers.ReadOnlyField(source='project.client.first_name')

#     class Meta:
#         model = Proposal
#         fields = [
#             'id', 
#             'project', 
#             'project_title',
#             'freelancer', 
#             'freelancer_name',
#             'client_name',
#             'cover_letter', 
#             'bid_amount', 
#             'estimated_days', 
#             'status', 
#             'created_at'
#         ]
#         read_only_fields = ['freelancer', 'status', 'created_at']


from rest_framework import serializers
from .models import Proposal
from apps.projects.models import Project
from django.contrib.auth import get_user_model

User = get_user_model()

class ProposalSerializer(serializers.ModelSerializer):
    freelancer_name = serializers.ReadOnlyField(source='freelancer.first_name')  # Or username
    project_title = serializers.ReadOnlyField(source='project.title')
    client_name = serializers.ReadOnlyField(source='project.client.first_name')
    
    # --- New Fields for Frontend Compatibility ---
    job_title = serializers.ReadOnlyField(source='project.title') # Alias for React
    client_id = serializers.ReadOnlyField(source='project.client.id')
    freelancer_id = serializers.ReadOnlyField(source='freelancer.id')

    class Meta:
        model = Proposal
        fields = [
            'id', 
            'project', 
            'project_title',
            'job_title',      # Added
            'freelancer', 
            'freelancer_id',  # Added
            'freelancer_name',
            'client_name',
            'client_id',      # Added
            'cover_letter', 
            'bid_amount', 
            'estimated_days', 
            'status', 
            'created_at'
        ]
        read_only_fields = ['freelancer', 'status', 'created_at']
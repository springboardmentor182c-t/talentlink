from rest_framework import serializers
from .models import Proposal


class ProposalSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.get_full_name', read_only=True)
    freelancer_name = serializers.CharField(source='freelancer.get_full_name', read_only=True)
    
    class Meta:
        model = Proposal
        fields = [
            'id',
            'project_title',
            'client',
            'client_name',
            'freelancer',
            'freelancer_name',
            'bid_amount',
            'status',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at', 'freelancer']


class ProposalCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = [
            'project_title',
            'client',
            'bid_amount',
        ]

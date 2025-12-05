from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('client', 'created_at', 'updated_at')


from .models import SavedProject


class SavedProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedProject
        fields = ('id', 'freelancer', 'project', 'saved_at')
        read_only_fields = ('freelancer', 'saved_at')

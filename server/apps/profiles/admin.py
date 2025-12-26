from django.contrib import admin
from .models import FreelancerProfile

@admin.register(FreelancerProfile)
class FreelancerProfileAdmin(admin.ModelAdmin):
    list_display = ('project_title', 'user', 'budget', 'status', 'created_at')
    search_fields = ('project_title', 'required_skills')
    list_filter = ('status', 'experience_years')
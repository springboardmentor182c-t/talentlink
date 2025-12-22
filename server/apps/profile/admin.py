from django.contrib import admin
from .models import FreelancerProfile, ClientProfile


@admin.register(FreelancerProfile)
class FreelancerProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'first_name',
        'last_name',
        'title',
        'hourly_rate',
        'profile_completeness',
        'created_at'
    ]
    list_filter = ['availability', 'created_at', 'profile_completeness']
    search_fields = ['user__username', 'user__email', 'first_name', 'last_name', 'title']
    readonly_fields = ['profile_completeness', 'created_at', 'updated_at']
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'profile_image')
        }),
        ('Professional Information', {
            'fields': ('title', 'bio', 'skills', 'languages', 'portfolio_links')
        }),
        ('Rates & Availability', {
            'fields': ('hourly_rate', 'availability')
        }),
        ('Location', {
            'fields': ('location',)
        }),
        ('Documents', {
            'fields': ('documents',)
        }),
        ('Stats', {
            'fields': ('profile_completeness', 'created_at', 'updated_at')
        }),
    )


@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'first_name',
        'last_name',
        'company_name',
        'profile_completeness',
        'created_at'
    ]
    list_filter = ['created_at', 'profile_completeness']
    search_fields = ['user__username', 'user__email', 'first_name', 'last_name', 'company_name']
    readonly_fields = ['profile_completeness', 'created_at', 'updated_at']
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'profile_image')
        }),
        ('Company Information', {
            'fields': ('company_name', 'company_description', 'website')
        }),
        ('Contact Information', {
            'fields': ('phone', 'location', 'country')
        }),
        ('About', {
            'fields': ('bio',)
        }),
        ('Documents', {
            'fields': ('documents',)
        }),
        ('Stats', {
            'fields': ('profile_completeness', 'created_at', 'updated_at')
        }),
    )

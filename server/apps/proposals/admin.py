


from django.contrib import admin
from .models import Proposal

@admin.register(Proposal)
class ProposalAdmin(admin.ModelAdmin):
    # We replaced 'project_title' and 'client' with helper functions below
    list_display = ("id", "get_project_title", "get_client", "freelancer", "status", "created_at")
    list_filter = ("status",)

    # Helper to get the title from the related Project model
    def get_project_title(self, obj):
        return obj.project.title
    get_project_title.short_description = 'Project Title'

    # Helper to get the client from the related Project model
    def get_client(self, obj):
        return obj.project.client
    get_client.short_description = 'Client'
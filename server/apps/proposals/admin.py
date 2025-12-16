from django.contrib import admin

# Register your models here.
#from django.contrib import admin
from .models import Proposal

@admin.register(Proposal)
class ProposalAdmin(admin.ModelAdmin):
    list_display = ("id", "project_title", "client", "freelancer", "status", "created_at")
    list_filter = ("status",)

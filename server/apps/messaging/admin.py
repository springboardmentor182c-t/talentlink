# File: apps/messaging/admin.py

from django.contrib import admin
from .models import Proposal, Conversation, Message

admin.site.register(Proposal)
admin.site.register(Conversation)
admin.site.register(Message)
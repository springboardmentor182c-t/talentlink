# from django.contrib import admin
# from .models import Proposal, Conversation, Message

# admin.site.register(Proposal)
# admin.site.register(Conversation)
# admin.site.register(Message)


from django.contrib import admin
from .models import Conversation, Message

admin.site.register(Conversation)
admin.site.register(Message)

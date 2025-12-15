from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from .models import Conversation, Message
from .serializers import (
    ConversationSerializer,
    MessageSerializer,
    MessageCreateSerializer
)
from .permissions import CanSendMessage


class ConversationListView(generics.ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(participants=self.request.user)


class MessageListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, CanSendMessage]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return MessageCreateSerializer
        return MessageSerializer

    def get_queryset(self):
        conversation = get_object_or_404(
            Conversation, id=self.kwargs['conversation_id']
        )
        self.check_object_permissions(self.request, conversation)
        return conversation.messages.all()

    def perform_create(self, serializer):
        conversation = get_object_or_404(
            Conversation, id=self.kwargs['conversation_id']
        )

        self.check_object_permissions(self.request, conversation)

        serializer.save(
            sender=self.request.user,
            conversation=conversation
        )

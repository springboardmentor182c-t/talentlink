from rest_framework.permissions import BasePermission


class CanSendMessage(BasePermission):

    def has_object_permission(self, request, view, conversation):
        user = request.user
        proposal = conversation.proposal

        if user == proposal.client:
            return proposal.status in ['sent', 'accepted']

        if user == proposal.freelancer:
            return proposal.status == 'accepted'

        return False

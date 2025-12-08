from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import FreelancerProfile
from .serializers import FreelancerProfileSerializer


class FreelancerProfileViewSet(viewsets.ModelViewSet):
    serializer_class = FreelancerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Restrict profiles to the authenticated freelancer's own profile
        return FreelancerProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Ensure the profile is always tied to the authenticated freelancer
        serializer.save(user=self.request.user)


from rest_framework import viewsets, permissions
from .models import FreelancerProfile
from .serializers import FreelancerProfileSerializer
from .permissions import IsOwnerOrReadOnly

class FreelancerProfileViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Freelancer Profiles.
    - Create: Authenticated users can create a profile (one per user).
    - List/Retrieve: Publicly available (anyone can view profiles).
    - Update/Delete: Only the owner of the profile can perform these actions.
    """
    queryset = FreelancerProfile.objects.all().order_by('-created_at')
    serializer_class = FreelancerProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Automatically associate the logged-in user with the profile
        serializer.save(user=self.request.user)
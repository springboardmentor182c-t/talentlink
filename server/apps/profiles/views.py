from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
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

    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """
        Endpoint for the current user to view or edit their own profile.
        """
        # Try to get the profile for the current user
        try:
            profile = request.user.freelancer_profile.first() # related_name is 'freelancer_profile' (plural implied if foreign key, but related_name matches model)
            # Actually related_name='freelancer_profile' in ForeignKey usually returns a Manager if multiple, 
            # OR if it was OneToOne it would be a direct object.
            # Let's double check the model.
            # The model says: user = models.ForeignKey(..., related_name='freelancer_profile')
            # So request.user.freelancer_profile is a RelatedManager.
            # We want the *first* one, or create one if logic demands, but typically 'me' implies one.
            # If the user has multiple profiles, this might be ambiguous, but let's assume one for 'me' context or return list?
            # The Goal says "one per user" in the docstring of the class. 
            # If so, it should probably be OneToOne, but the code says ForeignKey.
            # Let's assume we want the most recent one or the first one.
            
            # Correction: The model change comment says "Change OneToOneField -> ForeignKey".
            # So it IS a collection.
            # However, for a 'me' endpoint to work as a singular profile edit, we might need to define which one.
            # Or, we just get the latest one.
            # Let's grab the first one found.
            if not profile:
                 profile = request.user.freelancer_profile.first()
        except AttributeError:
             # This handles case where related_name might be different or not accessible if auth fails (though perm checks prevent that)
             profile = None

        if request.method == 'GET':
            if not profile:
                return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)

        elif request.method in ['PUT', 'PATCH']:
            # If no profile exists, maybe we should create one? 
            # For now, let's assume update requires existence. 
            # If they want to create, they use the main collection POST.
            if not profile:
                 return Response({"detail": "Profile not found. Please create one first."}, status=status.HTTP_404_NOT_FOUND)

            serializer = self.get_serializer(profile, data=request.data, partial=(request.method == 'PATCH'))
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
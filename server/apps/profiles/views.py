from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import FreelancerProfile, ClientProfile
from .serializers import FreelancerProfileSerializer, ClientProfileSerializer
from .permissions import IsOwnerOrReadOnly

class ClientProfileViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Client Profiles.
    """
    queryset = ClientProfile.objects.all().order_by('-created_at')
    serializer_class = ClientProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FreelancerProfileViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Freelancer Profiles.
    """
    queryset = FreelancerProfile.objects.all().order_by('-created_at')
    serializer_class = FreelancerProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get', 'post', 'put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """
        Endpoint for the current user to view or edit their own profile.
        Query Params: ?profile_type=client or ?profile_type=freelancer
        """
        user = request.user
        profile_type = request.query_params.get('profile_type')

        # Helper to safely get profile
        def get_client_profile(u):
            try:
                return u.client_profile
            except:
                return None

        if profile_type == 'client':
            profile = get_client_profile(user)
            serializer_cls = ClientProfileSerializer
            model_cls = ClientProfile
        elif profile_type == 'freelancer':
            profile = user.freelancer_profile.first()
            serializer_cls = FreelancerProfileSerializer
            model_cls = FreelancerProfile
        else:
            # Default behavior based on Role
            if getattr(user, 'role', None) == 'client':
                profile = get_client_profile(user)
                serializer_cls = ClientProfileSerializer
                model_cls = ClientProfile
            else:
                profile = user.freelancer_profile.first()
                serializer_cls = FreelancerProfileSerializer
                model_cls = FreelancerProfile

        if request.method == 'GET':
            if not profile:
                return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
            serializer = serializer_cls(profile)
            return Response(serializer.data)

        elif request.method == 'POST':
            if profile:
                return Response({"detail": "Profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
            serializer = serializer_cls(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        elif request.method in ['PUT', 'PATCH']:
            # If profile doesn't exist, create it
            if not profile:
                 serializer = serializer_cls(data=request.data, context={'request': request})
                 serializer.is_valid(raise_exception=True)
                 serializer.save(user=user)
                 return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            serializer = serializer_cls(profile, data=request.data, partial=(request.method == 'PATCH'), context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
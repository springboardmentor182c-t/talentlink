from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def client_profile_create(request):
    if ClientProfile.objects.filter(user=request.user).exists():
        return Response({'detail': 'Client profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = ClientProfileSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def client_profile_edit(request):
    try:
        profile = ClientProfile.objects.get(user=request.user)
    except ClientProfile.DoesNotExist:
        return Response({'detail': 'Client profile does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ClientProfileSerializer(profile)
        return Response(serializer.data)
    serializer = ClientProfileSerializer(profile, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def freelancer_profile_create(request):
    if FreelancerProfile.objects.filter(user=request.user).exists():
        return Response({'detail': 'Freelancer profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = FreelancerProfileSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def freelancer_profile_edit(request):
    try:
        profile = FreelancerProfile.objects.get(user=request.user)
    except FreelancerProfile.DoesNotExist:
        return Response({'detail': 'Freelancer profile does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = FreelancerProfileSerializer(profile)
        return Response(serializer.data)
    serializer = FreelancerProfileSerializer(profile, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import FreelancerProfile, ClientProfile
from .serializers import FreelancerProfileSerializer, ClientProfileSerializer
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from django.shortcuts import get_object_or_404


class FreelancerProfileViewSet(viewsets.ModelViewSet):
    serializer_class = FreelancerProfileSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return FreelancerProfile.objects.all()
        return FreelancerProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get', 'post'], permission_classes=[AllowAny])
    def me(self, request):
        if not request.user or not request.user.is_authenticated:
            if request.method == 'GET':
                return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"detail": "Authentication required to create/update profile"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            profile = FreelancerProfile.objects.get(user=request.user)
            if request.method == 'POST':
                serializer = self.get_serializer(profile, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)
                return Response(serializer.data)
            else:
                serializer = self.get_serializer(profile)
                return Response(serializer.data)
        except FreelancerProfile.DoesNotExist:
            if request.method == 'POST':
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)


class ClientProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ClientProfileSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return ClientProfile.objects.all()
        return ClientProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get', 'post'], permission_classes=[AllowAny])
    def me(self, request):
        if not request.user or not request.user.is_authenticated:
            if request.method == 'GET':
                return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)


class ProfileViewSet(viewsets.ViewSet):
    """Unified profile endpoint that dispatches to freelancer or client based on user role."""

    @action(detail=False, methods=['get', 'post'], permission_classes=[AllowAny])
    def me(self, request):
        if not request.user or not request.user.is_authenticated:
            if request.method == 'GET':
                return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"detail": "Authentication required to create/update profile"}, status=status.HTTP_401_UNAUTHORIZED)
        user_type = getattr(request.user, 'user_type', None)
        if not user_type:
            if FreelancerProfile.objects.filter(user=request.user).exists():
                user_type = 'freelancer'
            elif ClientProfile.objects.filter(user=request.user).exists():
                user_type = 'client'

        if user_type == 'freelancer':
            try:
                profile = FreelancerProfile.objects.get(user=request.user)
                if request.method == 'POST':
                    serializer = FreelancerProfileSerializer(profile, data=request.data, partial=True)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    return Response(serializer.data)
                serializer = FreelancerProfileSerializer(profile)
                return Response(serializer.data)
            except FreelancerProfile.DoesNotExist:
                if request.method == 'POST':
                    serializer = FreelancerProfileSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user=request.user)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        elif user_type == 'client':
            try:
                profile = ClientProfile.objects.get(user=request.user)
                if request.method == 'POST':
                    serializer = ClientProfileSerializer(profile, data=request.data, partial=True)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    return Response(serializer.data)
                serializer = ClientProfileSerializer(profile)
                return Response(serializer.data)
            except ClientProfile.DoesNotExist:
                if request.method == 'POST':
                    serializer = ClientProfileSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user=request.user)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({"detail": "User type not recognized"}, status=status.HTTP_400_BAD_REQUEST)

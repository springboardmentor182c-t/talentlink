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
        role = getattr(request.user, 'role', None)
        if not role:
            if FreelancerProfile.objects.filter(user=request.user).exists():
                role = 'freelancer'
            elif ClientProfile.objects.filter(user=request.user).exists():
                role = 'client'

        if role == 'freelancer':
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

        elif role == 'client':
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
            return Response({"detail": "User role not recognized"}, status=status.HTTP_400_BAD_REQUEST)






from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.utils import timezone
import datetime
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

# Import serializers
from .serializers import (
    RegisterSerializer, VerifyOTPSerializer, 
    ForgotPasswordSerializer, ResetPasswordSerializer,
    CustomTokenObtainPairSerializer
)
from apps.core.utils import generate_otp, send_otp_email

User = get_user_model()

# --- 1. Custom Login View ---
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# --- 2. Registration ---
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    authentication_classes = []  # Added to ensure registration is always public
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# --- 3. OTP Verification ---
class VerifyOTPView(views.APIView):
    authentication_classes = [] # Explicitly disable auth to prevent 401 checks
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            
            try:
                user = User.objects.get(email=email)
                
                # Check if OTP is expired (10 minutes)
                if user.otp_created_at and (timezone.now() - user.otp_created_at) > datetime.timedelta(minutes=10):
                    return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
                
                if user.otp == otp:
                    user.is_active = True
                    user.is_verified = True
                    user.otp = None 
                    user.save()
                    return Response({"message": "Verified successfully."}, status=status.HTTP_200_OK)
                
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- 4. Forgot Password ---
class ForgotPasswordView(views.APIView):
    authentication_classes = [] # Added: Essential for public access
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                otp = generate_otp()
                user.otp = otp
                user.otp_created_at = timezone.now()
                user.save()
                send_otp_email(email, otp)
                return Response({"message": "OTP sent."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                # Security best practice to prevent email enumeration
                return Response({"message": "OTP sent."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- 5. Reset Password ---
class ResetPasswordView(views.APIView):
    authentication_classes = [] # Added: Essential for public access
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            new_password = serializer.validated_data['new_password']
            try:
                user = User.objects.get(email=email)
                
                # Added: Check if OTP is expired (Same logic as VerifyOTP)
                if user.otp_created_at and (timezone.now() - user.otp_created_at) > datetime.timedelta(minutes=10):
                    return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)

                if user.otp == otp:
                    user.set_password(new_password)
                    user.otp = None
                    user.save()
                    return Response({"message": "Password reset."}, status=status.HTTP_200_OK)
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- 6. Profile (simple current-user details) ---
class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "id": user.id,
            "email": getattr(user, "email", ""),
            "username": getattr(user, "username", ""),
            "first_name": getattr(user, "first_name", ""),
            "last_name": getattr(user, "last_name", ""),
            "role": getattr(user, "role", ""),
        }
        return Response(data, status=status.HTTP_200_OK)


class LogoutView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError:
            return Response({"error": "Invalid or expired refresh token."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
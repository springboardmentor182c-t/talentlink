from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.utils import timezone
import datetime
from .serializers import (
    RegisterSerializer, VerifyOTPSerializer, 
    ForgotPasswordSerializer, ResetPasswordSerializer
)
from apps.core.utils import generate_otp, send_otp_email

User = get_user_model()

# 1. Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# 2. OTP Verification View
class VerifyOTPView(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            
            try:
                user = User.objects.get(email=email)
                
                # Check if OTP is expired (10 minutes limit)
                if user.otp_created_at and (timezone.now() - user.otp_created_at) > datetime.timedelta(minutes=10):
                    return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
                
                if user.otp == otp:
                    user.is_active = True
                    user.is_verified = True
                    user.otp = None # Clear the used OTP
                    user.save()
                    return Response({"message": "Account verified successfully. You can now login."}, status=status.HTTP_200_OK)
                
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 3. Forgot Password View
class ForgotPasswordView(views.APIView):
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
                return Response({"message": "OTP sent to your email"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                # We return 200 even if user isn't found to prevent email scraping
                return Response({"message": "OTP sent to your email"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 4. Reset Password View
class ResetPasswordView(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = User.objects.get(email=email)
                if user.otp == otp:
                    user.set_password(new_password)
                    user.otp = None # Clear OTP
                    user.save()
                    return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
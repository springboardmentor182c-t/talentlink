from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
import random

from .serializers import RegisterSerializer
from apps.users.models import User

# 🔐 TEMP OTP STORAGE (for demo / internship)
OTP_STORE = {}


# =========================
# REGISTER
# =========================
class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        role = request.data.get('role')

        # If a user with this email already exists, handle it gracefully
        existing = User.objects.filter(email=email).first()
        if existing:
            # If role is same (or user already supports both), prompt login
            if existing.user_type == role or existing.user_type == 'both':
                return Response({"error": "Email already registered. Please login."}, status=status.HTTP_400_BAD_REQUEST)

            # Otherwise, upgrade the account to support both roles and return tokens
            existing.user_type = 'both'
            existing.save()

            refresh = RefreshToken.for_user(existing)
            return Response({
                "message": "Account updated to support both roles",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": existing.id,
                    "email": existing.email,
                    "user_type": existing.user_type
                }
            }, status=status.HTTP_200_OK)

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# LOGIN
# =========================
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role")

        # Debug: incoming payload
        print(f"Login attempt payload: email={email} role={role}")

        user = authenticate(username=email, password=password)

        # Normalize role/user_type and accept users with 'both' role
        role_req = (role or '').lower()
        user_type = (getattr(user, 'user_type', '') or '').lower() if user else ''

        if user is None:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if role_req != user_type and user_type != 'both':
            # Helpful debug info during development
            print(f"Login role mismatch: requested={role_req} stored={user_type} for user={email}")
            return Response(
                {"error": "Invalid credentials or role mismatch"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Debug: successful match
        print(f"Login success for {email} with stored user_type={user.user_type} and requested role={role_req}")

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "user_type": user.user_type
            }
        })


# =========================
# SEND OTP (PRINTS IN TERMINAL)
# =========================
@api_view(['POST'])
def send_otp(request):
    email = request.data.get("email")

    if not email:
        return Response(
            {"error": "Email is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    otp = random.randint(1000, 9999)
    OTP_STORE[email] = otp

    # 🔥 PRINT OTP IN TERMINAL
    print("=================================")
    print(f"OTP for {email} is: {otp}")
    print("=================================")

    return Response(
        {"message": "OTP sent successfully"},
        status=status.HTTP_200_OK
    )


# =========================
# VERIFY OTP
# =========================
@api_view(['POST'])
def verify_otp(request):
    email = request.data.get("email")
    otp = request.data.get("otp")

    if not email or not otp:
        return Response(
            {"error": "Email and OTP are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    stored_otp = OTP_STORE.get(email)

    if stored_otp is None:
        return Response(
            {"error": "OTP not found. Please request again."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if str(stored_otp) != str(otp):
        return Response(
            {"error": "Invalid OTP"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ OTP VERIFIED — REMOVE IT
    del OTP_STORE[email]

    return Response(
        {"message": "OTP verified successfully"},
        status=status.HTTP_200_OK
    )


# =========================
# RESET PASSWORD (AFTER OTP)
# =========================
@api_view(['POST'])
def reset_password(request):
    email = request.data.get("email")
    new_password = request.data.get("password")

    if not email or not new_password:
        return Response(
            {"error": "Email and new password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # 🔐 Secure password hashing
    user.password = make_password(new_password)
    user.save()

    return Response(
        {"message": "Password reset successfully"},
        status=status.HTTP_200_OK
    )

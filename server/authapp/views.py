from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
import random

from .serializers import RegisterSerializer
from .models import User

# 🔐 TEMP OTP STORAGE (for demo / internship)
OTP_STORE = {}


# =========================
# REGISTER
# =========================
class RegisterView(APIView):
    def post(self, request):
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

        user = authenticate(username=email, password=password)

        if user is None or user.role != role:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
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

from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    send_otp,
    verify_otp,
    reset_password
)

urlpatterns = [
    # Auth
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),

    # OTP
    path('send-otp/', send_otp),
    path('verify-otp/', verify_otp),

    # Reset Password
    path('reset-password/', reset_password),
]

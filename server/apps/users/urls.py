



from django.urls import path 
from rest_framework_simplejwt.views import TokenRefreshView

# Import views safely
from .views import (
    CustomLoginView, 
    RegisterView, 
    VerifyOTPView, 
    ForgotPasswordView, 
    ResetPasswordView,
    ProfileView,
    LogoutView,
)

urlpatterns = [
    # Custom Login
    path('login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    
    # Refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Auth Flow
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # Current user profile
    path('profile/', ProfileView.as_view(), name='profile'),
]
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Root test endpoint
    path("", lambda request: HttpResponse("API is running 🚀")),

    # Admin
    path("admin/", admin.site.urls),

    # JWT Authentication
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Users and Freelancers
    path("api/users/", include("apps.users.urls")),
    path("api/freelancers/", include("apps.users.urls")),  # If you want both

    # Core app
    path("api/", include("apps.core.urls")),

    # Profiles
    path("api/profiles/", include("apps.profiles.urls")),

    # Messaging
    path("api/messaging/", include("apps.messaging.urls")),

    # Reviews
    path("api/reviews/", include("apps.reviews.urls")),

    # Projects
    path("api/projects/", include("apps.projects.urls")),

    # Contracts
    path("api/contracts/", include("apps.contracts.urls")),

    # Proposals
    path("api/proposals/", include("apps.proposals.urls")),
]

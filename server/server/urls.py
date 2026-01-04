from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "status": "ok",
        "message": "TalentLink backend running",
        "auth": "Google OAuth working"
    })


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', home),  # 👈 Added THIS LINE
    path('admin/', admin.site.urls),

    # JWT AUTH (THIS WAS MISSING)
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/users/', include('apps.users.urls')),
    path('api/', include('apps.core.urls')),
    path('api/profiles/', include('apps.profiles.urls')),
    path('api/messaging/', include('apps.messaging.urls')),

    path('api/v1/analytics/', include('apps.analytics.urls')),
    path('api/v1/auth/', include('apps.users.urls')),
    path('auth/', include('social_django.urls', namespace='social')),
    path("oauth/success/", include("apps.users.urls")),
    
]

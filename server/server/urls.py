from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT AUTH (THIS WAS MISSING)
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/users/', include('apps.users.urls')),
    path('api/', include('apps.core.urls')),
    path('api/profiles/', include('apps.profiles.urls')),
    path('api/messaging/', include('apps.messaging.urls')),

    # path('api/v1/analytics/', include('apps.analytics.urls')),
    path('api/v1/auth/', include('apps.users.urls')),

    path('api/projects/', include('apps.projects.urls')),
    # path('api/v1/projects/', include('apps.projects.urls')),
    path('api/contracts/', include('apps.contracts.urls')),

    path('api/proposals/', include('apps.proposals.urls')),


]

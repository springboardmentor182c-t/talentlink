from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Projects APIs
    path('api/', include('projects.urls')),

    # Auth APIs (LOGIN / SIGNUP)
    path('api/auth/', include('authapp.urls')),
]

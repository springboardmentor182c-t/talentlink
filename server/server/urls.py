from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

urlpatterns = [
    path("", lambda request: HttpResponse("API is running 🚀")),
    path("admin/", admin.site.urls),
    path("api/proposals/", include("apps.proposals.urls")),
    path("api/freelancers/", include("apps.users.urls")),
]

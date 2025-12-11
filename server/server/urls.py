from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", lambda request: HttpResponse("API is running 🚀")),
    path("admin/", admin.site.urls),
    path("api/proposals/", include("apps.proposals.urls")),
    path("api/messaging/", include("apps.messaging.urls")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

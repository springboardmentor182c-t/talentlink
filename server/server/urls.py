from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", lambda request: HttpResponse("API is running 🚀")),
    path("admin/", admin.site.urls),

    # Keep existing app includes and add projects API
    path("api/users/", include("apps.users.urls")),
    path("api/shoutouts/", include("apps.shoutouts.urls")),
    path("api/comments/", include("apps.comments.urls")),
    path("api/reactions/", include("apps.reactions.urls")),
    path("api/adminpanel/", include("apps.adminpanel.urls")),

    # Projects app
    path("api/projects/", include("apps.projects.urls")),

    # Keep other routes present in main
    path("api/proposals/", include("apps.proposals.urls")),
    path("api/messaging/", include("apps.messaging.urls")),
    path("api/profile/", include("apps.profile.urls")),
    path("api/contracts/", include("apps.contracts.urls")),

    # Auth endpoints (OTP, reset password)
    path("api/auth/", include("authapp.urls")),

    # Notifications app
    path("api/notifications/", include("apps.notifications.urls")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

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
    path("api/freelancers/", include("apps.freelancers.urls")),
    path("api/contracts/", include("apps.contracts.urls")),
]
    path("api/freelancers/", include("apps.users.urls")),  # keep as main had it
]

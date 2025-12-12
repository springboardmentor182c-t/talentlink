from django.urls import path
from .views import CreateProjectView, ListProjectsView

urlpatterns = [
    path('create/', CreateProjectView.as_view(), name='create_project'),
    path('', ListProjectsView.as_view(), name='list_projects'),
]

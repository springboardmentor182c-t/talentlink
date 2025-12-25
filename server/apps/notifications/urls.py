from django.urls import path
from .views import (
    NotificationListView,
    MarkNotificationReadView,
    MarkAllNotificationsReadView,
    UnreadNotificationCountView
)

urlpatterns = [
    path('', NotificationListView.as_view(), name='notifications'),
    path('read/<int:pk>/', MarkNotificationReadView.as_view()),
    path('read-all/', MarkAllNotificationsReadView.as_view()),
    path('unread-count/', UnreadNotificationCountView.as_view()),
]

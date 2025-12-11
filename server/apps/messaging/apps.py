from django.apps import AppConfig


class MessagingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.messaging'

    def ready(self):
        try:
            import apps.messaging.signals  # noqa: F401
        except Exception:
            pass

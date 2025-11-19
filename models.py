from django.db import models

class Freelancer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    skills = models.TextField()
    experience = models.IntegerField()
    bio = models.TextField()

    def __str__(self):
        return self.name

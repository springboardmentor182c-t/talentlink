from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Freelancer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    skills = models.ManyToManyField(Skill)   # ← Linked here
    experience = models.IntegerField()
    bio = models.TextField()

    def __str__(self):
        return self.name
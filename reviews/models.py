from django.db import models
from django.contrib.auth.models import User
from profiles.models import Profile

class Review(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    rating = models.IntegerField()  # Add the rating field
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='reviews')  # Establish a relationship with the Profile model

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'

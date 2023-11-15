from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    media_file = models.FileField(upload_to='media/', blank=True)

    # Additional fields for specific file types
    audio_file = models.FileField(upload_to='audio/', blank=True)
    video_file = models.FileField(upload_to='video/', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
from django.urls import path
from .views import MusicListCreateAPIView, MusicRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('api/music/', MusicListCreateAPIView.as_view(), name='music-list-create'),
    path('api/music/<int:pk>/', MusicRetrieveUpdateDestroyAPIView.as_view(), name='music-detail'),
]
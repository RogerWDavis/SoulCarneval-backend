from django.shortcuts import render
from rest_framework import generics
from .models import Music
from .serializers import MusicSerializer

class MusicListCreateAPIView(generics.ListCreateAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class MusicRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer


from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from duggiezb.permissions import IsOwnerOrReadOnly

class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
        try:
            profile = Profile.objects.get(pk=self.kwargs['pk'])
            self.check_object_permissions(self.request, profile)
            return profile
        except Profile.DoesNotExist:
            raise Http404

    def delete(self, request, *args, **kwargs):
        profile = self.get_object()
        self.check_object_permissions(self.request, profile)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
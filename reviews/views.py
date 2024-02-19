from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from duggiezb.permissions import IsOwnerOrReadOnly
from .models import Review
from .serializers import ReviewSerializer

class ReviewList(generics.ListCreateAPIView):
    
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Review.objects.order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'owner__profile',
    ]
    search_fields = [
        'owner__username',
        'title',
    ]
    ordering_fields = [
        'created_at',
    ]

    def perform_create(self, serializer):
        # Fetch the profile ID of the owner
        profile_id = self.request.user.profile.id
        # Set the profile_id field in the serializer data
        serializer.validated_data['profile_id'] = profile_id
        # Save the review
        serializer.save(owner=self.request.user)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Review.objects.order_by('-created_at')


class ProfileReviewList(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile_id = self.request.query_params.get('profile_id')  # Fetch profile ID from query parameters
        if profile_id is not None:
            return Review.objects.filter(profile_id=profile_id)
        else:
            return Review.objects.none()
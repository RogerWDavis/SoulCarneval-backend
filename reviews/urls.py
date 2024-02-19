from django.urls import path
from .views import ReviewList, ReviewDetail, ProfileReviewList

urlpatterns = [
    path('reviews/', ReviewList.as_view(), name='review-list'),  # For listing and creating reviews
    path('reviews/<int:pk>/', ReviewDetail.as_view(), name='review-detail'),  # For retrieving, updating, and deleting individual reviews
    path('my-reviews/', ProfileReviewList.as_view(), name='profile-review-list'),  # For listing profile-specific reviews
]

from rest_framework import serializers
from .models import Review
from profiles.models import Profile  # Import the Profile model

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_image']  # Include the 'profile_image' field

class ReviewSerializer(serializers.ModelSerializer):
    # Define a serializer field for profile_image
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'title', 'content', 'rating', 'profile_id', 'profile_image']  # Include 'profile_id' and 'profile_image' fields

    def get_profile_image(self, obj):
        # Access the related profile and retrieve the profile_image field
        profile = obj.profile
        if profile:
            return profile.profile_image.url  # Assuming profile_image is a FileField or ImageField
        return None

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.profile_id = validated_data.get('profile_id', instance.profile_id)
        instance.save()
        return instance

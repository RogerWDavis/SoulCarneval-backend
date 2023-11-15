from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_media_file = serializers.ReadOnlyField(source='owner.profile.media_file.url')

    def validate_media_file(self, value):
        # Your validation logic here (if needed)
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_media_file', 'created_at', 'updated_at',
            'title', 'content', 'media_file'
        ]
from rest_framework import serializers
from posts.models import Post
from likes.models import Like

class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_picture = serializers.SerializerMethodField()
    like_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()

    def validate_profile_picture(self, value):
        return self.validate_media(value, 'profile_picture')

    def validate_audio_file(self, value):
        return self.validate_media(value, 'audio_file')

    def validate_video_file(self, value):
        return self.validate_media(value, 'video_file')

    def validate_media(self, value, field_name):
        # Customize validation for each media type (e.g., audio, video)
        max_size = 2 * 1024 * 1024
        max_height = 4096
        max_width = 4096

        if value.size > max_size:
            raise serializers.ValidationError(f'{field_name} size larger than {max_size} bytes!')
        if getattr(value, 'image', None):
            if value.image.height > max_height:
                raise serializers.ValidationError(
                    f'{field_name} height larger than {max_height}px!'
                )
            if value.image.width > max_width:
                raise serializers.ValidationError(
                    f'{field_name} width larger than {max_width}px!'
                )

        return value

    def get_profile_picture(self, obj):
        return obj.owner.profile.profile_picture.url if obj.owner.profile.profile_picture else None

    def get_is_owner(self, obj):
        user = self.context['request'].user
        return user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(owner=user, post=obj).first()
            return like.id if like else None
        return None

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_picture', 'created_at', 'updated_at',
            'title', 'content', 'audio_file', 'video_file', 'like_id','likes_count', 'comments_count',
        ]

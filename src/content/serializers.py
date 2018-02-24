from rest_framework import serializers

from content.models import Video
from content.models import Artist


from lib.utils import validate_email as email_is_valid

class LivestreamThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('streamName', 'streamDuration', 'streamAuthor', 'streamDate', 'streamURL', 'streamViews', 'streamLikes', 'streamDescription')


class VideoThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('streamName', 'streamDuration', 'streamAuthor', 'streamDate', 'streamURL', 'streamViews', 'streamLikes', 'streamDescription')

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'description', 'date_added', 'setList', 'setListTime', 'streamFee')


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id','artist', 'imageurl','imageurl1','imageurl2', 'description','desc1','desc2','facebook','twitter','instagram','spotify','spotifyURI')

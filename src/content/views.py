from django.shortcuts import get_object_or_404
from django_rest_logger import log
#from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from content.models import Video
from content.models import Likes

from content.serializers import VideoThumbnailSerializer
from content.serializers import VideoSerializer
from content.serializers import LivestreamThumbnailSerializer
from content.models import LiveStream
from content.models import Artist
from content.serializers import ArtistSerializer
from content.models import Requests


from lib.utils import AtomicMixin

class FetchHomeLivestream(GenericAPIView):
    authentication_classes = ()
    serializer_class = LivestreamThumbnailSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = LiveStream.objects.all().order_by("-date_added")
        serializer = LivestreamThumbnailSerializer(queryset, many=True)
        data = serializer.data
#        queryset = Objective.objects.filter(username=request.data['username'], date__lte=request.data['endDate'], date__gte = request.data['startDate']).order_by('-id')
        #video = Video(name="asdf", artist='username', url="2015-05-05", description='objective', shots='note', date_added='2015-05-05 00:00:00', date_updated='2015-05-05 00:00:00')
        #video.save()

        return Response(data, status=status.HTTP_200_OK)

class FetchHomeVideo(GenericAPIView):
    authentication_classes = ()
    serializer_class = VideoThumbnailSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Video.objects.all().order_by("-date_added")
        serializer = VideoThumbnailSerializer(queryset, many=True)
        data = serializer.data
#        queryset = Objective.objects.filter(username=request.data['username'], date__lte=request.data['endDate'], date__gte = request.data['startDate']).order_by('-id')
        #video = Video(name="asdf", artist='username', url="2015-05-05", description='objective', shots='note', date_added='2015-05-05 00:00:00', date_updated='2015-05-05 00:00:00')
        #video.save()

        return Response(data, status=status.HTTP_200_OK)

class FetchVideo(GenericAPIView):
    authentication_classes = ()
    serializer_class = VideoThumbnailSerializer
    
    def post(self, request):
        """Process request and return video object."""
        queryset = Video.objects.filter(streamURL=request.data['videoID'])
        serializer = VideoThumbnailSerializer(queryset, many=True)
        data = serializer.data

        return Response(data, status=status.HTTP_200_OK)

class TriggerLike(GenericAPIView):
    authentication_classes = ()
    serializer_class = VideoThumbnailSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        likes = Likes.objects.filter(user_email=request.data['user_email']).filter(stream_url=request.data['videoID'])
        response = "";
        if(likes):

            likes.delete()
            video = Video.objects.get(streamURL=request.data['videoID'])
            video.streamLikes = video.streamLikes - 1;
            video.save()
            response = "unliked"
        else :
            l = Likes(user_email=request.data['user_email'], stream_url=request.data['videoID'])
            l.save()
            video = Video.objects.get(streamURL=request.data['videoID'])
            video.streamLikes = video.streamLikes + 1;
            video.save()
            reponse = "liked"


        return Response(response, status=status.HTTP_200_OK)



class FetchRecommendations(GenericAPIView):
    authentication_classes = ()
    serializer_class = VideoThumbnailSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Video.objects.all().order_by("-date_added")[:4]
        serializer = VideoThumbnailSerializer(queryset, many=True)
        data = serializer.data
#        queryset = Objective.objects.filter(username=request.data['username'], date__lte=request.data['endDate'], date__gte = request.data['startDate']).order_by('-id')
        #video = Video(name="asdf", artist='username', url="2015-05-05", description='objective', shots='note', date_added='2015-05-05 00:00:00', date_updated='2015-05-05 00:00:00')
        #video.save()

        return Response(data, status=status.HTTP_200_OK)


class RequestLivestream(GenericAPIView):
    authentication_classes = ()
    def post(self, request):
        """Notification add view"""

        request = Requests(artist_name=request.data['artistName'], user_email=request.data['userEmail'], event_date=request.data['eventDate'], event_location=request.data['eventLocation'])
        request.save()

        return Response("success", status=status.HTTP_200_OK)


class GetVideoLikes(GenericAPIView):
    authentication_classes = ()
    serializer_class = VideoThumbnailSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        likes = Likes.objects.filter(user_email=request.data['user_email']).filter(stream_url=request.data['videoID'])
        response = ""
        if(likes):
            response = "liked"
        else :
            reponse = "unliked"


        return Response(response, status=status.HTTP_200_OK)

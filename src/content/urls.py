from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.csrf import csrf_exempt

import content.views

urlpatterns = [
    url(_(r'^fetchHomeVideos/$'),
        csrf_exempt(content.views.FetchHomeVideo.as_view()),
        name='fetch_home_videos'),
    url(_(r'^requestLivestream/$'),
        csrf_exempt(content.views.RequestLivestream.as_view()),
        name='request_livestream'),
    url(_(r'^fetchHomeLivestream/$'),
        csrf_exempt(content.views.FetchHomeLivestream.as_view()),
        name='fetch_livestream'),
    url(_(r'^fetchRecommendations/$'),
        csrf_exempt(content.views.FetchRecommendations.as_view()),
        name='fetch_recommended_videos'),
    url(_(r'^fetchVideo/$'),
        csrf_exempt(content.views.FetchVideo.as_view()),
        name='fetchVideo'),
    url(_(r'^triggerLike/$'),
        csrf_exempt(content.views.TriggerLike.as_view()),
        name='triggerLike'),
    url(_(r'^getVideoLikes/$'),
        csrf_exempt(content.views.GetVideoLikes.as_view()),
        name='getVideoLikes'),
]

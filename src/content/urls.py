from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.csrf import csrf_exempt

import content.views

urlpatterns = [
    url(_(r'^fetchHomeVideos/$'),
        csrf_exempt(content.views.FetchHomeVideo.as_view()),
        name='fetch_home_videos'),
]

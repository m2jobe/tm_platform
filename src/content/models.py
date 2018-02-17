import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Video(models.Model ):
    """
    Model that represents an video.
    """

    streamName = models.CharField(_('streamName'), max_length=50)
    streamArtist = models.CharField(_('streamArtist'), max_length=200)
    streamAuthor = models.CharField(_('streamAuthor'), max_length=200)
    streamDate = models.DateTimeField(_('streamDate'))
    streamDescription = models.TextField(_('streamDescription'))
    streamDislikes = models.IntegerField(_('streamDislikes'))
    streamDuration = models.CharField(_('streamDuration'), max_length=10)
    streamLikes = models.IntegerField(_('streamLikes'))
    streamLocation = models.CharField(_('streamLocation'), max_length=50)
    streamViews = models.IntegerField(_('streamViews'))
    streamURL = models.CharField(_('streamURL'), max_length=10, primary_key=True)
    streamSetList = models.TextField(_('streamSetList'))

    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an user model.
        :return: string
        """
        return self.streamName


class Artist(models.Model ):
    """
    Model that represents an video.
    """

    artist = models.CharField(_('Name'), max_length=50)
    imageurl = models.URLField(_('Url'), max_length=200)
    imageurl1 = models.URLField(_('imageurl1'), max_length=200)
    imageurl2 = models.URLField(_('imageurl2'), max_length=200)
    description = models.TextField(_('Description'))
    desc1 = models.TextField(_('desc1'))
    desc2 = models.TextField(_('desc2'))
    facebook = models.URLField(_('facebook'), max_length=200)
    twitter = models.URLField(_('twitter'), max_length=200)
    instagram = models.URLField(_('instagram'), max_length=200)
    spotify = models.URLField(_('spotify'), max_length=200)
    spotifyURI = models.CharField(_('spotifyURI'), max_length=200)

    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an user model.
        :return: string
        """
        return self.artist

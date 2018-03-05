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

    streamName = models.CharField(_('streamName'), max_length=200)
    streamArtist = models.CharField(_('streamArtist'), max_length=200)
    streamAuthor = models.CharField(_('streamAuthor'), max_length=200)
    streamDate = models.DateTimeField(_('streamDate'))
    streamDescription = models.TextField(_('streamDescription'))
    streamDislikes = models.IntegerField(_('streamDislikes'))
    streamDuration = models.CharField(_('streamDuration'), max_length=10)
    streamLikes = models.IntegerField(_('streamLikes'))
    streamLocation = models.CharField(_('streamLocation'), max_length=50)
    streamViews = models.IntegerField(_('streamViews'))
    streamURL = models.CharField(_('streamURL'), max_length=10)
    streamFee = models.DecimalField(_('streamFee'), max_digits=5, decimal_places=2)
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

    name = models.CharField(_('name'), max_length=150)
    image = models.URLField(_('image'), max_length=200)
    description = models.TextField(_('description'))
    facebook = models.URLField(_('facebook'), max_length=200)
    twitter = models.URLField(_('twitter'), max_length=200)
    instagram = models.URLField(_('instagram'), max_length=200)
    spotify = models.URLField(_('spotify'), max_length=200)
    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an user model.
        :return: string
        """
        return self.name


class Likes(models.Model ):
    """
    Model that represents an video.
    """

    user_email = models.CharField(_('user_email'), max_length=150)
    stream_url = models.URLField(_('stream_url'), max_length=200 )
    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)


    def __str__(self):
        """
        Unicode representation for a like model.
        :return: string
        """
        return self.id


class Requests(models.Model ):
    """
    Model that represents an video.
    """

    artist_name = models.CharField(_('artistName'), max_length=150)
    user_email = models.URLField(_('userEmail'), max_length=200)
    event_date = models.CharField(_('eventDate'), max_length=150)
    event_location = models.CharField(_('eventLocation'), max_length=150)

    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)


    def __str__(self):
        """
        Unicode representation for an user model.
        :return: string
        """
        return self.artist_name

class LiveStream(models.Model ):
    """
    Model that represents an video.
    """

    streamName = models.CharField(_('streamName'), max_length=200)
    streamArtist = models.CharField(_('streamArtist'), max_length=200)
    streamAuthor = models.CharField(_('streamAuthor'), max_length=200)
    streamDate = models.DateTimeField(_('streamDate'))
    streamDescription = models.TextField(_('streamDescription'))
    streamDislikes = models.IntegerField(_('streamDislikes'))
    streamDuration = models.CharField(_('streamDuration'), max_length=10)
    streamLikes = models.IntegerField(_('streamLikes'))
    streamLocation = models.CharField(_('streamLocation'), max_length=50)
    streamViews = models.IntegerField(_('streamViews'))
    streamURL = models.CharField(_('streamURL'), max_length=10)
    streamFee = models.DecimalField(_('streamFee'), max_digits=5, decimal_places=2)
    streamSetList = models.TextField(_('streamSetList'))

    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an user model.
        :return: string
        """
        return self.streamName

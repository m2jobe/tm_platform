# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('artist', models.CharField(verbose_name='Name', max_length=50)),
                ('imageurl', models.URLField(verbose_name='Url')),
                ('imageurl1', models.URLField(verbose_name='imageurl1')),
                ('imageurl2', models.URLField(verbose_name='imageurl2')),
                ('description', models.TextField(verbose_name='Description')),
                ('desc1', models.TextField(verbose_name='desc1')),
                ('desc2', models.TextField(verbose_name='desc2')),
                ('facebook', models.URLField(verbose_name='facebook')),
                ('twitter', models.URLField(verbose_name='twitter')),
                ('instagram', models.URLField(verbose_name='instagram')),
                ('spotify', models.URLField(verbose_name='spotify')),
                ('spotifyURI', models.CharField(verbose_name='spotifyURI', max_length=200)),
                ('date_added', models.DateTimeField(verbose_name='date joined', auto_now_add=True)),
                ('date_updated', models.DateTimeField(verbose_name='date updated', auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('streamName', models.CharField(verbose_name='streamName', max_length=50)),
                ('streamArtist', models.CharField(verbose_name='streamArtist', max_length=200)),
                ('streamAuthor', models.CharField(verbose_name='streamAuthor', max_length=200)),
                ('streamDate', models.DateTimeField(verbose_name='streamDate')),
                ('streamDescription', models.TextField(verbose_name='streamDescription')),
                ('streamDislikes', models.IntegerField(verbose_name='streamDislikes')),
                ('streamDuration', models.CharField(verbose_name='streamDuration', max_length=10)),
                ('streamLikes', models.IntegerField(verbose_name='streamLikes')),
                ('streamLocation', models.CharField(verbose_name='streamLocation', max_length=50)),
                ('streamViews', models.IntegerField(verbose_name='streamViews')),
                ('streamURL', models.CharField(verbose_name='streamURL', primary_key=True, max_length=10, serialize=False)),
                ('streamSetList', models.TextField(verbose_name='streamSetList')),
                ('date_added', models.DateTimeField(verbose_name='date joined', auto_now_add=True)),
                ('date_updated', models.DateTimeField(verbose_name='date updated', auto_now=True)),
            ],
        ),
    ]

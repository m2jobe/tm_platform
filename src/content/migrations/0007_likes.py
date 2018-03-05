# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0006_livestream'),
    ]

    operations = [
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('user_email', models.CharField(verbose_name='user_email', max_length=150)),
                ('stream_url', models.URLField(verbose_name='stream_url')),
                ('date_added', models.DateTimeField(verbose_name='date joined', auto_now_add=True)),
                ('date_updated', models.DateTimeField(verbose_name='date updated', auto_now=True)),
            ],
        ),
    ]

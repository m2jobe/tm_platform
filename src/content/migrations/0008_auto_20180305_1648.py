# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0007_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likes',
            name='stream_url',
            field=models.URLField(verbose_name='stream_url', unique=True),
        ),
        migrations.AlterField(
            model_name='likes',
            name='user_email',
            field=models.CharField(verbose_name='user_email', max_length=150, unique=True),
        ),
    ]

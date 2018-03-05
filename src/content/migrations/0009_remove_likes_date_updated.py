# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0008_auto_20180305_1648'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='likes',
            name='date_updated',
        ),
    ]

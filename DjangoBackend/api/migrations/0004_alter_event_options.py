# Generated by Django 3.2.7 on 2021-11-18 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_event_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ['date']},
        ),
    ]

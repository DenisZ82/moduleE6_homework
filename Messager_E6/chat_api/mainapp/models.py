from django.db import models
from django.contrib.auth.models import AbstractUser

from easy_thumbnails.fields import ThumbnailerImageField


class Room(models.Model):
    name = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.name.title()


class User(AbstractUser):
    avatar = ThumbnailerImageField(
        resize_source={'size': (300, 300), 'crop': 'smart'},
        upload_to='avatar',
        default='avatar/default.png',
    )
    room = models.OneToOneField(Room, on_delete=models.SET_NULL, null=True)


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор')
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    text = models.TextField()
    time_in = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:32]
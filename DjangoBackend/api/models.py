from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token


# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=40)
    description = models.TextField()
    poster = CloudinaryField('image', blank=True, null=True)
    date = models.DateField()
    time = models.CharField(max_length=30)
    location = models.CharField(max_length=100)
    regular_ticket = models.IntegerField()
    vip_ticket = models.IntegerField()
    max_attendance = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    # publisher = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
       return self.title

    class Meta:
        ordering = ['date']


class Transaction(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    phone_number = models.CharField(max_length=100)
    email = models.EmailField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    regular_tickets = models.IntegerField(default=0, blank=True, null=True)
    vip_tickets = models.IntegerField(default=0, blank=True, null=True)
    total_spend = models.IntegerField(default=0)
    transacted_on = models.DateTimeField(auto_now_add=True)
    transaction_code = models.CharField(max_length=12)


    def __str__(self):
       return self.event.title

    class Meta:
        ordering = ['-transacted_on']


@receiver(post_save, sender = User)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        Token.objects.create(user = instance)

    for user in User.objects.all():
        
        Token.objects.get_or_create(user = user)



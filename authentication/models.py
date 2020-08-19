from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    dob = models.DateField(verbose_name='Date of Birth', null=True)
    phone_number = models.CharField(max_length=12, verbose_name='Phone Number', null=True)
    address_1 = models.CharField(max_length=128, verbose_name="Address", null=True)
    address_2 = models.CharField(max_length=128, blank=True, null=True, verbose_name="Address cont'd")
    city = models.CharField(max_length=85, verbose_name="Town/City", null=True)
    county = models.CharField(max_length=100, verbose_name="County/Province", null=True)
    postcode = models.CharField(max_length=20, verbose_name="Post/Zip Code", null=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

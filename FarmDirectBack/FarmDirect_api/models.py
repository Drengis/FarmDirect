from django.db import models

# Create your models here.


class ATC(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        db_table = 'ATC'

# serializers.py
from rest_framework import serializers
from .models import ATC


class ATCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ATC
        fields = '__all__'

from .models import CustomUser
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class CustomUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    username = serializers.CharField(validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(min_length=8, write_only=True)
    dob = serializers.DateField(required=True)
    phone_number = serializers.CharField(required=True, max_length=15)
    address_1 = serializers.CharField(required=True, max_length=128)
    address_2 = serializers.CharField(required=False, max_length=128)
    city = serializers.CharField(required=True, max_length=85)
    county = serializers.CharField(required=True, max_length=100)
    postcode = serializers.CharField(required=True, max_length=20)

    class Meta:
        model = CustomUser
        fields = ('first_name',
                  'last_name',
                  'email',
                  'username',
                  'password',
                  'dob',
                  'phone_number',
                  'address_1',
                  'address_2',
                  'city',
                  'county',
                  'postcode')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

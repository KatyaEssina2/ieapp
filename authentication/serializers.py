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

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.password)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address_1 = validated_data.get('address_1', instance.address_1)
        instance.address_2 = validated_data.get('address_2', instance.address_2)
        instance.city = validated_data.get('city', instance.city)
        instance.county = validated_data.get('county', instance.county)
        instance.postcode = validated_data.get('postcode', instance.postcode)

        instance.save()

        return instance

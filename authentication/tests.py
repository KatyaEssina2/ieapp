from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import CustomUser
from rest_framework import status
from django.urls import reverse

class TestAuthentication(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create(username='katya', first_name='Katya', last_name='Essina')
        self.user.set_password('12345678')
        self.user.save()
        self.access_token, self.refresh_token = self.getTokens()

    def getTokens(self):
        response = self.client.post(reverse('authentication:token_create'), {'username':'katya', 'password': '12345678'}, format='json')
        return response.data['access'], response.data['refresh']

    def test_user_create(self):
        data = {
            'first_name': 'Andy',
            'last_name': 'Isawesome',
            'email': 'andy@sexy.com',
            'username': 'andy',
            'password': '12345678',
            'dob': '1995-11-27',
            'phone_number': '0756212345',
            'address_1': 'House',
            'city': 'City',
            'county': 'County',
            'postcode': 'Postcode',
        }
        user_count = CustomUser.objects.count()
        response = self.client.post(reverse('authentication:create_user'), data, format='json')
        self.assertEqual(CustomUser.objects.count(), user_count + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_create_missing_data(self):
        data = {}
        required_fields = [
            'first_name',
            'last_name',
            'email',
            'username',
            'password',
            'dob',
            'phone_number',
            'address_1',
            'city',
            'county',
            'postcode'
        ]
        user_count = CustomUser.objects.count()
        response = self.client.post(reverse('authentication:create_user'), data, format='json')
        self.assertEqual(CustomUser.objects.count(), user_count)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        for field in required_fields:
            self.assertIn(field, response.data)

    def test_user_name(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.access_token)
        response = self.client.get(reverse('authentication:user_name'))
        self.assertEqual(response.data['name'], 'Katya Essina')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_request(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT 1234')
        response = self.client.get(reverse('authentication:user_name'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_blacklist(self):
        response = self.client.post(reverse('authentication:blacklist'), {"refresh_token": self.refresh_token}, format="json")
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
        # check we cant access a new access token
        response = self.client.post(reverse('authentication:token_refresh'), {"refresh": self.refresh_token}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
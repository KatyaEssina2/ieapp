from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import CustomUserCreate, Home, UserName, LogoutAndBlacklistRefreshTokenForUserView

urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', CustomUserCreate.as_view(), name='create_user'),
    path('user/name/', UserName.as_view(), name='user_nae'),
    path('', Home.as_view(), name='home'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist')
]

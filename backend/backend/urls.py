
from django.contrib import admin
from django.urls import include, path

from api.views import CreateUserView # from our views file we import the CreateUserView class
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
# both are prebuilt views from the rest_framework_simplejwt library
# They allow us to obtain our access and refresh tokens, and to also refresh our access token


# Once the user is created we can use the TokenObtainPairView to get our access and refresh tokens
# its prebuilt in!!!!!

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),

]

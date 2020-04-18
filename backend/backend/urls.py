
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path("api/", include("users.urls")),
    path("api/", include("questions.urls")),
    path("api/rest-auth/", include("rest_auth.urls")),
    path("api/rest-auth/registration", include("rest_auth.registration.urls")),

]

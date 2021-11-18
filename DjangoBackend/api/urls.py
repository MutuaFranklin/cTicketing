from django.urls.conf import include
from . import views
from django.conf.urls.static import static
from django.urls import path, re_path
from django.conf import settings
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('auth/',obtain_auth_token),
    # path('events/', views.EventList.as_view()),
    path('events/', views.events ,name = 'events'),
    path('publish-event/', views.PostEvent.as_view()),
    path('transaction/<id>', views.transaction ,name = 'transaction'),
    path('all_transactions', views.all_transactions ,name = 'all_transactions'),
    path('search/', views.SearchEventAPIView.as_view()),
    path('current_user', views.current_user,name='current_user'),
    re_path(r'^event/$', views.FilterEventList.as_view()),
    re_path(r'single-event/(?P<event_pk>[0-9]+)/$', views.event_id, name ='single_event'),




]

if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
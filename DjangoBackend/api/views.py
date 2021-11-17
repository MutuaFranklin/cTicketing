from django.shortcuts import render
from .serializer import EventSerializer, UserSerializer
from .models import Event
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from django.http.response import JsonResponse, Http404, HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import generics,status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.parsers import JSONParser



#user authentication
class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


class UserViewSet(viewsets.ModelViewSet):
    """
    view or edit users.
    """
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)


# get & post event
class EventList(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, format=None):
        events = Event.objects.all()
        serializers = EventSerializer(events, many=True)
        return Response(serializers.data)


class PostEvent(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, format=None):
        events = Event.objects.all()
        serializers = EventSerializer(events, many=True)
        return Response(serializers.data)
        
    def post(self, request, format=None):
        user = request.user
        serializers = Event(data=request.data)
        if serializers.is_valid():
            serializers.save(user)
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny, ))
def events(request):
    user = request.user

    if request.method == 'GET':
        event = Event.objects.all()
       
        event_serializer = EventSerializer(event, many=True)
        return JsonResponse(event_serializer.data, safe=False)
    
    elif request.method == 'POST':
        publisher = request.user
        serializers = EventSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save(publisher)
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        
       



class FilterEventList(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title','date']
    

#single event
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((AllowAny, ))
def event_id(request, event_pk):
    try: 
        event = Event.objects.get(pk=event_pk) 
    except Event.DoesNotExist: 
        return JsonResponse({'message': 'The event does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        event_serializer = EventSerializer(event) 
        return JsonResponse(event_serializer.data) 
    elif request.method == 'PUT' and permission_classes == (IsAuthenticated,): 
        event_data = JSONParser().parse(request) 
        event_serializer = EventSerializer(event, data=event_data) 
        if event_serializer.is_valid(): 
            event_serializer.save() 
            return JsonResponse(event_serializer.data) 
        return JsonResponse(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE'and permission_classes == (IsAuthenticated,): 
        event.delete() 
        return JsonResponse({'message': 'Event was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT'])
@permission_classes((AllowAny,))
def current_user(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SearchEventAPIView(generics.ListCreateAPIView):
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer

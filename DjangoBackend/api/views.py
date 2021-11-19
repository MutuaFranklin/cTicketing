from django.shortcuts import render
from .email import send_welcome_email
from .serializer import EventSerializer, UserSerializer, TransactionSerializer
from .models import Event, Transaction
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from django.http.response import JsonResponse, Http404, HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.parsers import JSONParser
import sendgrid
from sendgrid.helpers.mail import (Mail, Email, Personalization)
from python_http_client import exceptions
from django.conf import settings



DEFAULT_FROM_EMAIL = settings.DEFAULT_FROM_EMAIL
SENDGRID_API_KEY = settings.SENDGRID_API_KEY
sg = sendgrid.SendGridAPIClient(SENDGRID_API_KEY)

# Sendgrid
class MailSenderAPIView(generics.GenericAPIView):
    def send_mail(self, template_id, sender, recipient, data_dict):
        mail = Mail()
        mail.template_id = template_id
        mail.from_email = Email(sender)
        personalization = Personalization()
        personalization.add_to(Email(recipient))
        personalization.dynamic_template_data = data_dict
        mail.add_personalization(personalization)
        try:
            response = sg.client.mail.send.post(request_body=mail.get())

        except exceptions.BadRequestsError as e:
            print("INSIDE")
            print(e.body)
            exit()
        print(response.status_code)
        print(response.body)
        print(response.headers)


    def post(self, request):
        recepient_email = request.data['recepient_email']
        subject = request.data['subject']
        fullname = request.data['fullname']
        body = request.data['body']
        template_id = "d-1772e8ac6b5442e68975394ea71a4957"
        sender = DEFAULT_FROM_EMAIL
        data_dict = {"subject": subject, "user_name": fullname, "body": body}
        MailSenderAPIView.send_mail(
            self, template_id, sender, recepient_email, data_dict)

        return Response({"status_code": status.HTTP_200_OK, "message": "Mail sent successfully."})


# user authentication
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
        # publisher = request.user
        serializers = EventSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

# Buy ticket transaction()


@api_view(['GET', 'POST'])
@permission_classes((AllowAny, ))
def transaction(request, id):
    if request.method == 'GET':
        transaction = Transaction.objects.filter(id=id).first()
        transaction_serializer = TransactionSerializer(transaction, many=True)
        return JsonResponse(transaction_serializer.data, safe=False)

    elif request.method == 'POST':
        serializers = TransactionSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save(event=Event.objects.filter(id=id).first())

            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

# View all transactions


@api_view(['GET'])
@permission_classes((AllowAny, ))
def all_transactions(request):
    if request.method == 'GET':
        transaction = Transaction.objects.all()
        transaction_serializer = TransactionSerializer(transaction, many=True)
        return JsonResponse(transaction_serializer.data, safe=False)


class FilterEventList(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title', 'date']


# single event
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
    elif request.method == 'PUT':
        event_data = JSONParser().parse(request)
        event_serializer = EventSerializer(event, data=event_data)
        if event_serializer.is_valid():
            event_serializer.save()
            return JsonResponse(event_serializer.data)
        return JsonResponse(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
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

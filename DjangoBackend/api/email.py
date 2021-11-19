from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def send_welcome_email(user,regular,vip,event_title,event_date,receiver):
    # Creating message subject and sender
    subject = 'Churchill Live Show Payment Confirmation'
    sender = 'frankmailautomation@gmail.com'

    #passing in the context vairables
    text_content = render_to_string(
        'email/welcome_email.txt',
        {"first_name": user}, 
        {"regular_tickets": regular},
        {"vip_tickets": vip},
        {"event_title": event_title},
        {"event_date": event_date},



        )
    html_content = render_to_string(
        'email/welcome_email.html',
        {"first_name": user}, 
        {"regular_tickets": regular},
        {"vip_tickets": vip},
        {"event_title": event_title},
        {"event_date": event_date},

    )

    msg = EmailMultiAlternatives(subject,text_content,sender,[receiver])
    msg.attach_alternative(html_content,'text/html')
    msg.send()


    
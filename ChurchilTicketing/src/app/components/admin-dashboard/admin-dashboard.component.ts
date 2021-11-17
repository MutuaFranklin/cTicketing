import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventsService } from 'src/app/services/events.service';
import { first } from 'rxjs/operators';
import { Event } from 'src/app/models/event';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  todayDate: Date = new Date();
  poster!: File;
  title!: string;
  description!: string;
  date!: any;
  time!: string;
  location!: string;
  regular_ticket!: any;
  vip_ticket!: any;
  max_attendance!: any;
  error!:any;
  events!:Event[];
  currentUser!:Admin;
  showModal!: boolean;
  event:any;



  constructor(
    private authService: AuthenticationService,
    private eventService: EventsService,
    private router: Router,

    )
    {}

  titleChange(event: any) {
    this.title = event.target.value;
  }

  descriptionChange(event: any) {
    this.description = event.target.value;
  }

  dateChange(event: any) {
    this.date = event.target.value;
  }
  timeChange(event: any) {
    this.time = event.target.value;
  }

  posterUpload(event: any) {
    this.poster = event.target.files[0];
  }
  locationChange(event: any) {
    this.location = event.target.value;
  }
  regularChange(event: any) {
    this.regular_ticket = event.target.value;
  }
  vipChange(event: any) {
    this.vip_ticket = event.target.value;
    console.log(this.vip_ticket)
  }
  attendanceChange(event: any) {
    this.max_attendance = event.target.value;
  }

  showEventModal(id:any){
    this.showModal = true; // Show-Hide Modal Check



}


  ngOnInit() {
    let promise = new Promise <void> ((resolve,reject)=>{
      this.eventService.allEvents().toPromise().then(
        (response:any) => {
          console.log(response)
        this.events = response;
        resolve()
      },
      (error:string) => {

      })
    })

    this.authService.getCurrentUser().pipe(first()).subscribe((loggedUser: Admin) => {
      this.currentUser = loggedUser;
      console.log(loggedUser)
    });

    // Jquery
    $('.openNav').on('click', function () {
      $('#mySidenav').css({ width: '250px' });
      $('#main').css({ marginLeft: '250px' });
      $('.openNav').fadeOut(1000);
    });

    $('.closebtn').on('click', function () {
      $('#mySidenav').css({ width: '0' });
      $('#main').css({ marginLeft: '0' });
      $('.openNav').fadeIn(1000);
    });

    $('.dashboard-btn').on('click', function () {
      $('.dashboard').fadeIn(1000);
      $('.events').hide();
      $('.transactions').fadeOut(700);

    });

    $('.events-btn').on('click', function () {
      $('.dashboard').hide();
      $('.transactions').hide();
      $('.events').fadeIn(700);
    });

    $('.transactions-btn').on('click', function () {
      $('.dashboard').hide();
      $('.transactions').fadeIn(1000);
      $('.events').hide();
    });
  }

  adminLogout() {
    this.authService.logout();
  }

  publishEvent(){

    const eventData = new FormData()
    eventData.append('title', this.title)
    eventData.append('description', this.description)
    eventData.append('poster', this.poster)
    eventData.append('date', this.date)
    eventData.append('time', this.time)
    eventData.append('location', this.date)
    eventData.append('regular_ticket', this.regular_ticket)
    eventData.append('vip_ticket', this.vip_ticket)
    eventData.append('max_attendance', this.max_attendance)



    this.eventService.postEvent(eventData).subscribe( response => {
      console.log(response)
      alert("The Event Post has been published"),
      window.location.reload();



    },

    error => {
      this.error = error
      console.log('error',error)
    }
    );

  }

  goToView(id: any){
    this.router.navigate(['/admin-view',id])
  }
  goToEdit(id: any){
    this.router.navigate(['/admin-edit',id])
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-edit-event',
  templateUrl: './admin-edit-event.component.html',
  styleUrls: ['./admin-edit-event.component.css'],
})
export class AdminEditEventComponent implements OnInit {
  poster!: File;
  title!: string;
  description!: string;
  date!: any;
  time!: string;
  location!: string;
  regular_ticket!: any;
  vip_ticket!: any;
  max_attendance!: any;
  error!: any;
  event: any;

  constructor(
    private router: Router,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private previous: Location,

  ) {}

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
    console.log(this.vip_ticket);
  }
  attendanceChange(event: any) {
    this.max_attendance = event.target.value;
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    let promise = new Promise<void>((resolve, reject) => {
      this.eventService
        .SingleEvent(id)
        .toPromise()
        .then(
          (response: any) => {
            // console.log(response);
            this.event = response;

            resolve();
          },

          (error: string) => {}
        );
    });
  }

  editEvent(){
    const eventData = new FormData()
    eventData.append('title', this.title)
    eventData.append('description', this.description)
    eventData.append('poster', this.poster)
    eventData.append('date', this.date)
    eventData.append('time', this.time)
    eventData.append('location', this.location)
    eventData.append('regular_ticket', this.regular_ticket)
    eventData.append('vip_ticket', this.vip_ticket)
    eventData.append('max_attendance', this.max_attendance)

    let id = this.route.snapshot.paramMap.get('id');

    this.eventService.updateEvent(this.event, id).subscribe(data => {
      alert("Event updated successfully")
      window.location.reload();

      // console.log(data)

    }, (error: any)=> {

      console.log(error);
    })


  }

  goBack() {
    this.previous.back(); // <-- go back to previous location on cancel
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-view-event',
  templateUrl: './admin-view-event.component.html',
  styleUrls: ['./admin-view-event.component.css']
})
export class AdminViewEventComponent implements OnInit {

  event!:any;

  constructor(
    private router: Router,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private location: Location,


  ) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');


    let promise = new Promise <void> ((resolve,reject)=>{
      this.eventService.SingleEvent(id).toPromise().then(
        (response:any) => {
         console.log(response)
        this.event = response;



        resolve()
      },

      (error:string) => {

      })
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {

  events!:Event[];


  constructor(
    private http: HttpClient,
    private eventService: EventsService,
    private router: Router,


  )

  { }

  ngOnInit(){
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
    return promise

  }


  goToUrl(id: any){
    this.router.navigate(['event',id])
  }


}

import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  regularTickets: number =0;
  totalRegular: number =0;
  vipTickets: number = 0;
  totalVip: number = 0;
  regularUnit!: number;
  vipUnit!:number;
  totalNoTickets: number =0;
  totalAmount:number =0;
  event:any



  constructor(
    private router: Router,
    private eventService: EventsService,
    private route: ActivatedRoute

  ) { }




  regularChange(event:any){
    this.regularTickets = event.target.value;
    this.regularUnit = 500
    this.totalRegular = this.regularTickets * this.regularUnit


   }



   vipChange(event:any){
    this.vipTickets = event.target.value;
    this.vipUnit = event.vip_ticket
    this.totalVip = this.vipTickets * this.vipUnit

   }


   goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }



  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');


    let promise = new Promise <void> ((resolve,reject)=>{
      this.eventService.SingleEvent(id).toPromise().then(
        (response:any) => {
        // console.log(response.regular_ticket)
        this.event = response;
        this.regularUnit = response.regular_ticket
        this.totalRegular = this.regularTickets * this.regularUnit

        console.log(this.regularUnit)


        resolve()
      },

      (error:string) => {

      })
    })













     // Jquery
     $('#grab-tickets').on('click', function () {
      window.scrollTo(0,document.body.scrollHeight);
      $("#ticket-title").fadeIn(1000);
      $("#rem-days").hide();
      $("#ticket-table").fadeIn(1000);

   });

   $('#hide-form').on('click', function () {
     $("#review-form").hide();
     $("#add-review").fadeIn(1000)
     $("#hide-form").hide();
   });


   $("#grab-tickets").on('click' ,function() {
     window.location.hash = "payment-btn"+$(this).attr("id");
   });
  }

}

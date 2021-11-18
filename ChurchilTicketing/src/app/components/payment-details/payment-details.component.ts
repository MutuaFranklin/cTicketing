import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  event!:any


  @Input()
  newTransaction!: any[];
  
  constructor(
    private router: Router,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private previous: Location,

  ) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');


    let promise = new Promise <void> ((resolve,reject)=>{
      this.eventService.SingleEvent(id).toPromise().then(
        (response:any) => {
        // console.log(response.regular_ticket)
        this.event = response;



        resolve()
      },

      (error:string) => {

      })


    })

    $('.mpesa').on('change', function() {
      $("#airtel-details").hide();
      $("#mpesa-details").fadeIn(3000);
      window.scrollTo(0,document.body.scrollHeight);



    });
    $('.airtel').on('change', function() {
      $("#airtel-details").fadeIn(3000);
      $("#mpesa-details").hide();
      window.scrollTo(0,document.body.scrollHeight);



    });
  }
  goBack() {
    this.previous.back(); // <-- go back to previous location on cancel
  }



}

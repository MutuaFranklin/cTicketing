import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { Transaction } from 'src/app/models/transaction';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  todayDate: Date = new Date()
  eventDate!:Date;
  daysToEvent!:number;
  regularTickets: number =0;
  totalRegular: number =0;
  vipTickets: number = 0;
  totalVip: number = 0;
  regularUnit: number =0;
  vipUnit!:number;
  totalNoTickets: number =0;
  totalAmount:number =0;
  event:any
  // transaction!: Transaction;
  error: any;



  newTransaction = new Transaction("", "","", "", "", 0,0,0, new Date(),"");
  @Output() addTransaction = new EventEmitter<Transaction>();


  submitTransaction(form: NgForm){
    this.addTransaction.emit(this.newTransaction);
    this.newTransaction = new Transaction("", "","", "", "", 0,0,0, new Date(),"");
  }


  constructor(
    private router: Router,
    private eventService: EventsService,
    private route: ActivatedRoute

  ) { }




  regularChange(event:any){
    this.regularTickets = event.target.value;


   }



   vipChange(event:any){
    this.vipTickets = event.target.value;
    this.vipUnit = event.vip_ticket
    this.totalVip = this.vipTickets * this.vipUnit

   }


   goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

   totalCost = document.getElementById("app");


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');


    let promise = new Promise <void> ((resolve,reject)=>{
      this.eventService.SingleEvent(id).toPromise().then(
        (response:any) => {
        // console.log(response.regular_ticket)
        this.event = response;
        this.eventDate =(response.date).getTime()







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

  makeTransaction(id:any){
    this.eventService.transaction(this.newTransaction, id).subscribe( response => {
      // console.log(response)
      alert('Transaction Confirmed. Thank you for being a Churchill show fan'),
      this.router.navigate(['landing'])
    },
    error => {
      this.error = error
      console.log('error',error)
    }
    );
  }


  goToPayment(id: any){
    this.router.navigate(['payment/',id])
  }


}

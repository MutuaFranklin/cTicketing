import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

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



}

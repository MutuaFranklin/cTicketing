import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChurchilTicketing';
  newTransaction:any;


  eventToPayment($event:any) {
    this.newTransaction = $event;
  }
}

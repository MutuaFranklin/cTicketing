import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminEditEventComponent } from './components/admin-edit-event/admin-edit-event.component';
import { AdminViewEventComponent } from './components/admin-view-event/admin-view-event.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaymentDetailsComponent,
    LandingComponent,
    EventDetailsComponent,
    UpcomingEventsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminEditEventComponent,
    AdminViewEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgHttpLoaderModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

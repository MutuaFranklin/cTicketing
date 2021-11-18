import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminEditEventComponent } from './components/admin-edit-event/admin-edit-event.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminViewEventComponent } from './components/admin-view-event/admin-view-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { LandingComponent } from './components/landing/landing.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'event/:id', component: EventDetailsComponent  },
  { path: 'payment/:id', component: PaymentDetailsComponent  },
  { path: 'login', component:  AdminLoginComponent  },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]  },
  { path: 'admin-view/:id', component: AdminViewEventComponent, canActivate: [AuthGuard] },
  { path: 'admin-edit/:id', component: AdminEditEventComponent, canActivate: [AuthGuard] },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  login:any;
  error: any;

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private LoginService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.login = {
      username: '',
      password: '',
      // email: '',

    };
  }



  LoginUser() {
    this.LoginService.loginAdmin(this.login)


  }

}

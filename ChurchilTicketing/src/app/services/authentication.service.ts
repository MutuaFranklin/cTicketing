import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  authUrl: string = environment.URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  error:any;


  constructor(private http:HttpClient,  private router: Router) {
  }


  loginAdmin(user: Admin) {
    return this.http.post<any>(`${this.authUrl}auth/`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access', res.access)
        // console.log(res.access)
          this.router.navigate(['dashboard']);


      }
      ,
    error => {
      this.error = error
      alert("Incorrect login details")
      console.log('error',error)
    })

  }

  getToken() {
    return localStorage.getItem('access');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access');
    return (authToken !== null) ? true : false;
  }

  logout() {
    let removeToken = localStorage.removeItem('access');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // current user
  getCurrentUser():Observable<any>{
    let user = this.authUrl+ 'current_user'
    return this.http.get(user, {headers: this.headers})

  }




  }



import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  apiUrl: string = environment.URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {

  }

  allEvents():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'events/')
  }

  searchEvent(event:string):Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'search/?search='+ event )
  }

  SingleEvent(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + `single-event/${id}`)
  }


  postEvent(eventData:any){
    return this.http.post<any[]>(this.apiUrl + 'events/', eventData )
  }

  updateEvent(event: any, id:any):Observable<any>{
    let api = this.apiUrl+ `edit-event/${id}`
    return this.http.put(api,event)

  }

  deleteEvent(id:any):Observable<any>{
    let api = this.apiUrl+ `single-event/${id}`
    return this.http.delete(api)

  }

  transaction(transactionDetails: any, id:any): Observable<any> {
    let api = `${this.apiUrl}transaction/${id}`;
    return this.http.post(api,transactionDetails)
      .pipe(
        catchError(this.handleError)
      )
  }

  all_transactions():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'all_transactions')
  }


   // Error
   handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}

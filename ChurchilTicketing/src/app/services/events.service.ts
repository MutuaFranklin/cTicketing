import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  apiUrl: string = environment.URL;

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


}

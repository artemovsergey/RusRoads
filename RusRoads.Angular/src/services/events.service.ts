import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  http = inject(HttpClient)

  getEvents(){
    return this.http.get<Event[]>(`${environment.api}/Events`)
  }

  getEventsByEmp(employeeId: number, old: boolean, current: boolean, future: boolean){

    var params = new HttpParams()
    .set("oldEvents", old)
    .set("currentEvents", current)
    .set("futureEvents", future);

    return this.http.get<Event[]>(`${environment.api}/Events/${employeeId}`, {params})
  }

  deleteEvent(eventId: number){
    return this.http.delete<Event>(`${environment.api}/Events/${eventId}`)
  }

  createEvent(event: Event){
    return this.http.post<Event>(`${environment.api}/Events`, event)
  }

}

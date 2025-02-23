import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Subdivision } from '../models/subdivision';

@Injectable({
  providedIn: 'root'
})
export class SubdivisonsService {

  employeesAll: any[] = []
  employeesAll$ = new BehaviorSubject<any[]>(this.employeesAll)
  currentSubId$ = new ReplaySubject<number>(1)

  http = inject(HttpClient)

  getll(){
    return this.http.get<any[]>(`${environment.api}/Subdivisions`)
  }

  getEmployees(subdivisionId: number){
    return this.http.get<any[]>(`${environment.api}/Subdivisions/${subdivisionId}/employees`)
  }

  getEmployeesAll(subdivisionId: number){
    return this.http.get<any[]>(`${environment.api}/Subdivisions/${subdivisionId}/employeesAll`)
  }

}

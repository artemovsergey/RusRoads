import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Subdivision } from '../models/subdivision';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class SubdivisonsService {

  employeesAll: Employee[] = []
  employeesAll$ = new BehaviorSubject<Employee[]>(this.employeesAll)
  currentSubId$ = new ReplaySubject<number>(1)

  http = inject(HttpClient)

  getll(): Observable<Subdivision[]>{
    return this.http.get<Subdivision[]>(`${environment.api}/Subdivisions`)
  }

  getEmployees(subdivisionId: number){
    return this.http.get<Employee[]>(`${environment.api}/Subdivisions/${subdivisionId}/employees`)
  }

  getEmployeesAll(subdivisionId: number){
    return this.http.get<Employee[]>(`${environment.api}/Subdivisions/${subdivisionId}/employeesAll`)
  }

}

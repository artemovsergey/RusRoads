import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdivisonsService {

  employees: any[] = []
  emp$ = new BehaviorSubject<any[]>(this.employees)

  http = inject(HttpClient)

  getll(){
    return this.http.get<any[]>(`${environment.api}/Subdivisions`)
  }

  getEmployee(subdivisionId: number){
    return this.http.get<any[]>(`${environment.api}/Subdivisions/${subdivisionId}/employeesAll`)
  }

}

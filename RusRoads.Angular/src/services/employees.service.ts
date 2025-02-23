import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  http = inject(HttpClient)

  getAll(){
    this.http.get(`${environment.api}/Employees}`)
  }

  create(employeeDto: Employee){
    return this.http.post<Employee>(`${environment.api}/Employees`, employeeDto)
  }

}

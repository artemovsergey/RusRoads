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
    this.http.get<Employee[]>(`${environment.api}/Employees}`)
  }

  create(employeeDto: Employee){
    return this.http.post<Employee>(`${environment.api}/Employees`, employeeDto)
  }

  update(employeeDto: Employee){
    return this.http.put<Employee>(`${environment.api}/Employees`, employeeDto)
  }

  delete(employeeDto: Employee){
    return this.http.delete<Employee>(`${environment.api}/Employees/${employeeDto.id}`)
  }

  dismiss(employeeDto: Employee){
    return this.http.put<Employee>(`${environment.api}/Employees/dismiss`, employeeDto)
  }



}

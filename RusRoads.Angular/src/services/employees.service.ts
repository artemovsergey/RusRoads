import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  http = inject(HttpClient)

  getAll(){
    this.http.get(`${environment.api}/Employee}`)
  }

}

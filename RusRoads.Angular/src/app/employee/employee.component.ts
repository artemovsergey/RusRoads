import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

  @Output()
  selectEmployee: EventEmitter<Employee> = new EventEmitter<Employee>()

  @Input()
  employee!: Employee

  getEmp(employee: Employee) {
    this.selectEmployee.emit(employee)
  }

}

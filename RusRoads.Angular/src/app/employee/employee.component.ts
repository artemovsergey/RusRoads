import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee',
  imports: [MatIconModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {


  @Output()
  selectEmployee: EventEmitter<Employee> = new EventEmitter<Employee>()

  @Output()
  deleteEmployee: EventEmitter<Employee> = new EventEmitter<Employee>()

  @Input()
  employee!: Employee

  getEmp(employee: Employee) {
    this.selectEmployee.emit(employee)
  }

  deleteEmp(employee: Employee) {
    this.deleteEmployee.emit(employee)
  }

}

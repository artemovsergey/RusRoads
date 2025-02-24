import { Component, inject, OnInit } from '@angular/core';
import { SubdivisonsService } from '../../services/subdivisons.service';
import { EmployeeComponent } from "../employee/employee.component";
import {MatIconModule} from '@angular/material/icon'

import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-empployee-dialog.component';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-empoyees',
  imports: [EmployeeComponent, MatIconModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmpoyeesComponent implements OnInit{

  dialog = inject(MatDialog);
  subService = inject(SubdivisonsService)
  empService = inject(EmployeesService)

  employees: Employee[] = []
  currentEmployees: Employee[] = []
  currentSubId!: number

  ngOnInit() {

    this.subService.currentSubId$.subscribe( r => {
      this.currentSubId = r; 
      console.log("Текущее подразделение: ", this.currentSubId);
      this.subService.getEmployees(this.currentSubId).subscribe(r => {this.currentEmployees = r; console.log(r)})
    })

    this.subService.employeesAll$.subscribe( r => this.employees = r)
    
  }

  addEmp() {
    const dialogRef = this.dialog.open(
      AddEmployeeDialogComponent,
      {data: [this.currentEmployees, this.currentSubId], autoFocus: true, width: '50%'}  // конфигурация
    );

    dialogRef.afterClosed().subscribe(result => {

      if (result && result as Employee){

        this.empService.create(result).subscribe(
          next => {
            // this.empService.getAll().subscribe(r => {
            //   this.empService.tasks$.next(r)
            // })
            console.log("Создание сотрудника: ", result)
          },
          error => { console.log(error.message) }
        )
      }
    });

  }

  editEmployee($event: any) {

    $event.birthday = $event.birthday.toString().split("T")[0];

    const dialogRef = this.dialog.open(
      EditEmployeeDialogComponent,
      {data: [this.currentEmployees, $event], autoFocus: true, width: '50%'}  // конфигурация
    );


    dialogRef.afterClosed().subscribe(result => {

      if (result && result as Employee){

        this.empService.update(result).subscribe(
          next => {
            // this.empService.getAll().subscribe(r => {
            //   this.empService.tasks$.next(r)
            // })
            console.log("Обновление сотрудника: ", result)
          },
          error => { console.log(error.message) }
        )
      }
    });
  }


  deleteEmployee($event: Employee) {
    this.empService.delete($event).pipe(
      switchMap(() => this.subService.getEmployeesAll(this.currentSubId)),
      catchError(error => {
        console.error('Ошибка удаления сотрудника:', error);
        return of([]); // Возвращаем пустой массив или другое значение по умолчанию
      })
    ).subscribe(employees => {
      this.subService.employeesAll$.next(employees);
    });
  }

}

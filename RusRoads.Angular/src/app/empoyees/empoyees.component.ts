import { Component, inject, OnInit } from '@angular/core';
import { SubdivisonsService } from '../../services/subdivisons.service';
import { BehaviorSubject } from 'rxjs';
import { EmployeeComponent } from "../employee/employee.component";
import {MatIconModule} from '@angular/material/icon'
import { AddempComponent } from '../addemp/addemp.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/employee';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';

@Component({
  selector: 'app-empoyees',
  imports: [EmployeeComponent, MatIconModule],
  templateUrl: './empoyees.component.html',
  styleUrl: './empoyees.component.scss'
})
export class EmpoyeesComponent implements OnInit{



  readonly dialog = inject(MatDialog);
  subService = inject(SubdivisonsService)
  employees: any[] = []
  emp$ = new BehaviorSubject<any[]>(this.employees)

  ngOnInit() {
    this.subService.emp$.subscribe( r => this.employees = r)
  }

  addEmp() {
    const dialogRef = this.dialog.open(
      AddempComponent,
      {data: [], autoFocus: true, width: '50%'}  // конфигурация
    );
  }

  editEmployee($event: any) {
    const dialogRef = this.dialog.open(
      EditEmployeeDialogComponent,
      {data: $event, autoFocus: true, width: '50%'}  // конфигурация
    );
  }

}

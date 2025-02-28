import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, MatIconModule, MatTooltip],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmployeeComponent {

  dialog = inject(MatDialog)


  @Output()
  selectEmployee: EventEmitter<Employee> = new EventEmitter<Employee>()

  @Output()
  deleteEmployee: EventEmitter<Employee> = new EventEmitter<Employee>()

  @Input()
  employee!: Employee

  getEmp(employee: Employee) {
    this.selectEmployee.emit(employee)
  }

  dismissEmployee(employee: Employee) {

    // подтверждение
    const dialogRef = this.dialog.open(ConfirmDialogComponent)

    dialogRef.afterClosed().pipe(
      tap((result) => console.log(result) ),
      map((result) => {
        if(result) this.deleteEmployee.emit(employee)
        }
      )
    ).subscribe()


    // this.deleteEmployee.emit(employee)
  }

  checkDateDismissEmployee(employee: Employee): boolean {
    
    if(employee == null || employee.dismiss_date == null) return true;

    const currentDate = new Date()
    const dismissDateEmployee = new Date(employee.dismiss_date)

    const differenceInDays = Math.floor((currentDate.getTime() - dismissDateEmployee.getTime()) / (1000 * 60 * 60 * 24));
    return Math.abs(differenceInDays) <= 30 ? true : false
  }


}

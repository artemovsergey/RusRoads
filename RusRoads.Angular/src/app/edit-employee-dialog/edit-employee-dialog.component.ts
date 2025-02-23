import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-employee-dialog',
  imports: [MatDialogModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss'
})
export class EditEmployeeDialogComponent implements OnInit {


  dialogRef = inject(MatDialogRef<EditEmployeeDialogComponent>)
  data = inject<Employee>(MAT_DIALOG_DATA)
  currentEmp: Employee = this.data
  isEdit: boolean = false;

  ngOnInit(): void {
    console.log(this.data)
  }

  cancel() {
    this.dialogRef.close()
  }

  ok() {
    console.log("Передана задача: ", this.currentEmp)
    this.dialogRef.close(this.currentEmp)
  }

}

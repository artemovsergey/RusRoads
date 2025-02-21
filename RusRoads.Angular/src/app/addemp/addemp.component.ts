import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import {} from '@angular/material/select'
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-addemp',
  imports: [MatDialogModule, CommonModule, FormsModule],
  templateUrl: './addemp.component.html',
  styleUrl: './addemp.component.scss'
})
export class AddempComponent {

  currentEmp: Employee = { id: 0, fio: "" }

  dialogRef = inject(MatDialogRef<AddempComponent>)
  data = inject<Employee>(MAT_DIALOG_DATA)

  ok() {
    console.log("Передана задача: ", this.currentEmp)
    this.dialogRef.close(this.currentEmp)
  }
  
  cancell() {
    this.dialogRef.close()
  }

}

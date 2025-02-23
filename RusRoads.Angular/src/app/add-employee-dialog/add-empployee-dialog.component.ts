import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { Employee } from '../../models/employee';
import { SubdivisonsService } from '../../services/subdivisons.service';

@Component({
  selector: 'app-addemp',
  imports: [MatDialogModule, CommonModule, FormsModule],
  templateUrl: './add-employee-dialog.component.html',
  styleUrl: './add-employee-dialog.component.scss'
})
export class AddEmployeeDialogComponent implements OnInit {


  subService = inject(SubdivisonsService)
  dialogRef = inject(MatDialogRef<AddEmployeeDialogComponent>)
  data = inject<Employee[]>(MAT_DIALOG_DATA)

  subdivisions: any[] = [] 

  currentEmp: Employee = {
    id: 0,
    fio: '',
    subdivisionId: 0,
    headId:0,
    helperId: 0,
    phone: '',
    date: new Date(),
    position: '',
    cabinet: '',
    info: ''
  }

  ngOnInit(): void {
    console.log("data", this.data)
    this.subService.getll().subscribe(r => this.subdivisions = r)
  }

  ok() {
    console.log("Передана задача: ", this.currentEmp)
    this.dialogRef.close(this.currentEmp)
  }
  
  cancell() {
    this.dialogRef.close()
  }

}

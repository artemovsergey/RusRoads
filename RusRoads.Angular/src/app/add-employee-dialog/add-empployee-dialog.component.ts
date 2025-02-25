import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { Employee } from '../../models/employee';
import { SubdivisonsService } from '../../services/subdivisons.service';
import { Subdivision } from '../../models/subdivision';

@Component({
  selector: 'app-addemp',
  imports: [MatDialogModule, CommonModule, FormsModule ],
  templateUrl: './add-employee-dialog.component.html',
  styleUrl: './add-employee-dialog.component.scss',
  standalone: true
})
export class AddEmployeeDialogComponent implements OnInit {

  subService = inject(SubdivisonsService)
  dialogRef = inject(MatDialogRef<AddEmployeeDialogComponent>)
  data = inject<any[]>(MAT_DIALOG_DATA)

  subdivisions: Subdivision[] = []

  currentEmp: Employee = {
    id: 0,
    fio: '',
      subdivision_id: this.data[1],
      subdivision: {
        id: 0,
        name: '',
        head_subdivision_id: 0
      },
    head_id: null,
    helper_id: null,
    phone: '',
    birthday: new Date("2020-01-01"),
    position: '',
    cabinet: '',
    job_phone: '',
    email: ''
  }

  ngOnInit() {
    this.subService.getll().subscribe(r => this.subdivisions = r)
  }

  ok() {
    console.log("Передан сотрудник: ", this.currentEmp)
    this.dialogRef.close(this.currentEmp)
  }
  
  cancell() {
    this.dialogRef.close()
  }

}

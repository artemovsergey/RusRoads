import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SubdivisonsService } from '../../services/subdivisons.service';

@Component({
  selector: 'app-edit-employee-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss'
})
export class EditEmployeeDialogComponent implements OnInit {

  subService = inject(SubdivisonsService)
  subdivisions: any[] = [] 
  dialogRef = inject(MatDialogRef<EditEmployeeDialogComponent>)
  data = inject<any[]>(MAT_DIALOG_DATA)
  currentEmp: Employee = this.data[1]
  isEdit: boolean = false;
  empForm!: FormGroup;
  private fb: FormBuilder =new FormBuilder()
  
  ngOnInit(): void {
    this.subService.getll().subscribe(r => this.subdivisions = r)

    this.empForm = this.fb.group({
      fio: [this.currentEmp.fio, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      phone: [this.currentEmp.phone, [Validators.pattern(/^[0-9+\-() #]{1,20}$/)]],
      subdivision_id: [this.currentEmp.subdivision_id, Validators.required],
      position: [this.currentEmp.position, Validators.required],
      head_id: [this.currentEmp.head_id],
      helper_id: [this.currentEmp.helper_id],
      birthday: [this.currentEmp.birthday],
      job_phone: [this.currentEmp.job_phone, [Validators.required, Validators.pattern(/^[0-9+\-() #]{1,20}$/)]],
      email: [this.currentEmp.email, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\.[a-zA-Zа-яА-Я]{2,}$/)]],
      cabinet: [this.currentEmp.cabinet, [Validators.required, Validators.maxLength(10)]]
    });

    // Подписка на изменения формы
    this.empForm.valueChanges.subscribe((values) => {
      this.currentEmp = { ...this.currentEmp, ...values };
    });

  }

  cancel() {
    this.dialogRef.close()
  }

  ok() {
    if (this.empForm.valid) {
      this.currentEmp = { ...this.currentEmp, ...this.empForm.value };
      console.log("Передана задача: ", this.currentEmp)
      this.dialogRef.close(this.currentEmp)
    }
  }

}

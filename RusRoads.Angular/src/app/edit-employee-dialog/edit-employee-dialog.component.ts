import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SubdivisonsService } from '../../services/subdivisons.service';
import { EventsService } from '../../services/events.service';
import { map, tap } from 'rxjs';
import { Event } from '../../models/event';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-edit-employee-dialog',
  imports: [MatTooltip, MatCheckboxModule, ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule, MatIconModule, MatButtonToggleModule, MatButtonModule],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss',
  standalone: true
})
export class EditEmployeeDialogComponent implements OnInit {

  eventService = inject(EventsService)
  subService = inject(SubdivisonsService)
  subdivisions: any[] = [] 
  dialogRef = inject(MatDialogRef<EditEmployeeDialogComponent>)
  data = inject<any[]>(MAT_DIALOG_DATA)
  currentEmp: Employee = this.data[1]
  isEdit: boolean = false;
  empForm!: FormGroup;
  private fb: FormBuilder =new FormBuilder()
  events: Event[] = []
  isVisibleAddFormEvent = false

  currentEvent: Event = {
    id: 0,
    event_type_id: null,
    employee_id: this.currentEmp.id,
    begin_date: null,
    end_date: null
  }

  is_old: boolean = false;
  is_current: boolean = true;
  is_future: boolean = true;
  
  ngOnInit(): void {

    this.eventService.getEventsByEmp(this.currentEmp.id,this.is_old,this.is_current,this.is_future).pipe(
      tap((r) => console.log(r)),
      map((r) => this.events = r)
    ).subscribe()

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
    // this.empForm.valueChanges.subscribe((values) => {
    //   this.currentEmp = { ...this.currentEmp, ...values };
    // });

  }

  createEvent() {
    console.log("Запрос к API на создание события!", this.currentEvent)

    this.eventService.createEvent(this.currentEvent).pipe(
      tap((r) => console.log("Результат: ", r)),
      tap(() => this.filterEvents() )
    ).subscribe()
  }

  filterEvents() {
    console.log(this.is_old, this.is_current, this.is_future)
    this.eventService.getEventsByEmp(this.currentEmp.id,this.is_old,this.is_current,this.is_future).pipe(
      tap((r) => console.log(r)),
      map((r) => this.events = r)
    ).subscribe()
  }

  addEvent() {
    console.log("Открытые окна добавления события");
    this.isVisibleAddFormEvent = !this.isVisibleAddFormEvent
  }

  removeEvent($event: Event) {
    console.log("Event", $event)

    this.eventService.deleteEvent($event.id).pipe(
      tap(() => this.filterEvents()),
      tap(() => console.log("Событие удалено"))
    ).subscribe()


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

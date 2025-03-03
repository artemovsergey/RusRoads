import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { MessuaresComponent } from "../messuares/messuares.component";
import { interval, switchMap, tap } from 'rxjs';
import { ParseXmlService } from '../../services/parse-xml.service';
import { CalendarComponent } from "../calendar/calendar.component";
import { EmployeeComponent } from "../employee/employee.component";
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-news',
    imports: [RouterModule, MatButtonModule, MatTooltipModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MessuaresComponent, CalendarComponent, EmployeeComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  standalone: true
})

export class NewsComponent {

  xmlService = inject(ParseXmlService)
  employeesService = inject(EmployeesService)

  news: any[] = []
  employees: Employee[] = [{
    id: 0,
    fio: '',
    phone: '',
    birthday: new Date("2020-01-01"),
    subdivision_id: 0,
    subdivision: null,
    position: '',
    head_id: null,
    helper_id: null,
    job_phone: '',
    email: '',
    cabinet: '',
    dismiss_date: null
  }, {
    id: 0,
    fio: '',
    phone: '',
    birthday: new Date(),
    subdivision_id: 0,
    subdivision: null,
    position: '',
    head_id: null,
    helper_id: null,
    job_phone: '',
    email: '',
    cabinet: '',
    dismiss_date: null
  }]


  ngOnInit() {

    var count: number = 1;

    this.xmlService.getRssFeed().pipe(
      tap((r) => console.log(r))
    ).subscribe(r => this.news = r )

    const refreshSubscription = interval(15000).pipe(
      tap((r) => console.log(r)),
      switchMap(() => this.xmlService.getRssFeed())
    ).subscribe(r => {count++; this.news = r; this.news = this.news.slice(0,count).reverse() ; console.log("Прошло 15 сек.")})

    // this.employeesService.getAll().pipe(
    //   tap((r) => console.log(r))
    // ).subscribe(r => this.employees =r)

  }

}

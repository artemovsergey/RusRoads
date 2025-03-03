import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { filter, interval, map, switchMap, tap } from 'rxjs';
import { ParseXmlService } from '../../services/parse-xml.service';
import { CalendarComponent } from "../calendar/calendar.component";
import { EmployeeComponent } from "../employee/employee.component";
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';
import { News } from '../../models/news';
import { AppService } from '../app.service';

@Component({
  selector: 'app-news',
  imports: [RouterModule, MatButtonModule, MatTooltipModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MessuaresComponent, CalendarComponent, EmployeeComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  standalone: true
})

export class NewsComponent implements OnInit {

  xmlService = inject(ParseXmlService)
  employeesService = inject(EmployeesService)
  appService = inject(AppService)

  news: any[] = [] // from rss
  employees!: Employee[] // from api
  messuares!: any[] // from another api
 

  ngOnInit() {
    this.appService.searchText$.subscribe(r => this.loadData(r))
    // this.loadData()

    interval(15000).pipe(
    tap(r => console.log(r)),
    switchMap(() => this.xmlService.getRssFeed())
    ).subscribe(r => {this.news = r.filter(item => item.title.includes(this.appService.searchText$.getValue()) )})

  }

  loadData(search: string){

    this.xmlService.getRssFeed().pipe(
    ).subscribe(r => {this.news = r.filter(item => (item.title.toLowerCase()).includes(search.toLowerCase()) ) } )

    this.employeesService.getAll().pipe(
    ).subscribe(r => this.employees = r.filter(item => (item.fio.toLowerCase()).includes(search.toLowerCase()) ))

    this.messuares = [{id:1, title:"putin"},
                      {id:2, title:"messuare2"},
                      {id:3, title:"messuare3"}].filter(item => (item.title.toLowerCase()).includes(search.toLowerCase()) )

  }

}

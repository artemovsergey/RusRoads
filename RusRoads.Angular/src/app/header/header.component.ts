import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-header',
  imports: [RouterModule, MatButtonModule, MatTooltipModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCalendar, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {


  appService = inject(AppService)

  searchText = ''

  searchComplex() {
    this.appService.searchText$.next(this.searchText)
  }

  clearSearch() {
    this.searchText = ''
    this.searchComplex()
  }

}


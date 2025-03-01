import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-header',
  imports: [MatTooltipModule, CalendarModule, ButtonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCalendar, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {


  getTooltipText(date: Date): string {
    if (date.getDate() === 15) {
      return 'Сегодня праздник! 🎉'; // Пример подсказки для 15 числа
    }
    return `Дата: ${date.toLocaleDateString()}`; // Подсказка по умолчанию
  }

  click() {
      console.log("click...")
  }

  date: Date | undefined;

  dateClass2 = (date: Date): string => {
    return 'special-date'
  };

    // После инициализации представления
    ngAfterViewInit(): void {
      this.addTooltips();
    }
    
    // Функция для добавления подсказок
    addTooltips(): void {
      const specialDates = document.querySelectorAll('.mat-calendar-body-cell');
      specialDates.forEach((dateCell) => {
        dateCell.setAttribute('matTooltip', "Сегодня праздник! 🎉");
      });
    }


  dateClass = (date: Date): string => {
    if (date.getDate() > 10 && date.getDate() < 15) {
      return 'highlight-date'; // Подсветка для дат с 11 по 14
    } else if (date.getDate() === 3) {
      return 'image-date'; // Иконка для 20 числа
    } else if (date.getDate() === 15) {
      return 'special-date4';
    } else if (date.getDate() === 16) {
      return 'special-date2';
    } else if (date.getDate() === 17) {
      return 'special-date';
    }
    return '';
  };


  onDateSelected(date: Date | null): void {
    console.log('Selected date:', date);
  }

}


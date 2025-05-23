import { Component, ViewEncapsulation } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HeaderComponent } from '../header/header.component';
import { HeaderCalendarComponent } from '../header-calendar/header-calendar.component';

@Component({
  selector: 'app-calendar',
  imports: [MatDatepickerModule],
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

  customHeader = HeaderCalendarComponent

  getTooltipText(date: Date): string {
    if (date.getDate() === 15) {
      return 'Сегодня праздник! 🎉'; // Пример подсказки для 15 числа
    }
    return `Дата: ${date.toLocaleDateString()}`; // Подсказка по умолчанию
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
      console.log("10-15")
      return 'highlight-date'; // Подсветка для дат с 11 по 14
    } else if (date.getDate() === 4) {
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

import { ChangeDetectionStrategy, Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { MatCalendarHeader } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { DateAdapter } from '@angular/material/core';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header-calendar',
  imports: [MatIconModule, TitleCasePipe ],
  templateUrl: './header-calendar.component.html',
  styleUrl: './header-calendar.component.scss',

})
export class HeaderCalendarComponent<D> extends MatCalendarHeader<D>  {

  adapter = inject(DateAdapter)
  // @HostBinding('class.mat-calendar-header') readonly matCalendarHeaderClass = true;

  get periodLabel(): string {
    return this.adapter.format(this.calendar.activeDate, { month: 'long', year: 'numeric' });
  }
}

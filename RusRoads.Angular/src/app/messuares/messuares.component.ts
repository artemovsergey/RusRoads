import { Component } from '@angular/core';

@Component({
  selector: 'app-messuares',
  imports: [],
  templateUrl: './messuares.component.html',
  styleUrl: './messuares.component.scss'
})
export class MessuaresComponent {


  downloadIcsFile() { 
    const icsContent = `
        BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//Your Organization//Your Product//EN
        BEGIN:VEVENT
        UID:uid1@example.com
        DTSTAMP:20231014T120000Z
        DTSTART:20231015T100000Z
        DTEND:20231015T120000Z
        SUMMARY:My Event
        DESCRIPTION:This is a test event
        END:VEVENT
        END:VCALENDAR
    `;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'event.ics';
    link.click();

    window.URL.revokeObjectURL(url);
  }

  generateVcard(): string {
    return `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Победить всех!
DTSTART:20240526T140000Z
DTEND:20240603T140000Z
DTSTAMP:20240525T121238Z
UID:1716639158936
DESCRIPTION:
LOCATION:
ORGANIZER:
STATUS:CONFIRMED
PRIORITY:0
END:VEVENT
END:VCALENDAR

    `.trim(); // Убираем лишние пробелы
  }
}

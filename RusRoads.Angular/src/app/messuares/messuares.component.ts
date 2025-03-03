import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-messuares',
  imports: [MatIconModule],
  templateUrl: './messuares.component.html',
  styleUrl: './messuares.component.scss'
})
export class MessuaresComponent implements OnInit {
  
  @Input()
  messuares: any[] = []

  ngOnInit(): void {
    
  }


  async downloadIcsFile(name: string) {
    const icsContent = `
        BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//Your Organization//Your Product//EN
        BEGIN:VEVENT
        UID:uid1@example.com
        DTSTAMP:20231014T120000Z
        DTSTART:20231015T100000Z
        DTEND:20231015T120000Z
        SUMMARY:${name}
        DESCRIPTION:This is a test event
        END:VEVENT
        END:VCALENDAR
    `;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

    try {
        if ('showSaveFilePicker' in window) {
            // Используем File System Access API, если доступен
            const handle = await (window as any).showSaveFilePicker({
                suggestedName: 'event.ics',
                types: [{
                    description: 'iCalendar Files',
                    accept: { 'text/calendar': ['.ics'] },
                }],
            });

            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
        } else {
            // Fallback для старых браузеров
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'event.ics';
            link.click();
            window.URL.revokeObjectURL(url);
        }
    } catch (err) {
        console.error('Error saving file:', err);
    }
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

    `.trim();
  }
}

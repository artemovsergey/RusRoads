import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DagreLayout, NgxGraphModule, Orientation } from '@swimlane/ngx-graph';
import { XmlComponent } from './xml/xml.component';
import { ParseXmlService } from '../services/parse-xml.service';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxGraphModule, QRCodeComponent],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
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



  onNodeClick(node: any) {
    console.log(node.id)
  }

  nodes: any[] = [];
  links: any[] = [];
  layout = new DagreLayout(); // Используем DagreLayout

  xmlService = inject(ParseXmlService)
  rssItems: any[] = []
  testData = [
    { id: 1, name: 'Главное подразделение', head_id: 1 },
    { id: 2, name: 'Подразделение A', head_id: 1 },
    { id: 3, name: 'Подразделение B', head_id: 1 },
    { id: 4, name: 'Подразделение C', head_id: 2 },
  ];

  ngOnInit(): void {
    this.xmlService.getRssFeed().subscribe({
      next: request => this.rssItems = request,
      error: error => console.log(error)
    })
    this.prepareData(this.testData);
    console.log('Nodes:', this.nodes);
    console.log('Links:', this.links);

    // Настройка ориентации
    this.layout.settings.orientation = Orientation.TOP_TO_BOTTOM
  }

  prepareData(data: any[]) {
    this.nodes = data.map((item) => ({
      id: item.id.toString(),
      label: item.name,
    }));

    this.links = data
      .filter((item) => item.head_id !== item.id)
      .map((item) => ({
        source: item.head_id.toString(),
        target: item.id.toString(),
      }));
  }
}
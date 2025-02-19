# Реализация обновления каждые 15 секунд

```ts
ngOnInit(): void {
    // Создаем интервал каждые 15 секунд
    this.updateSubscription = interval(15000)
      .pipe(
        // Используем switchMap для выполнения запроса каждые 15 секунд
        switchMap(() => this.newsService.getNews())
      )
      .subscribe(
        (data: any) => {
          this.news = data; // Обновляем список новостей
        },
        (error) => {
          console.error('Ошибка при получении новостей:', error);
        }
      );

    // Первоначальный запрос новостей
    this.newsService.getNews().subscribe(
      (data: any) => {
        this.news = data;
      },
      (error) => {
        console.error('Ошибка при получении новостей:', error);
      }
    );
  }
```


## RSS на .net

```Csharp
using System.ServiceModel.Syndication;
using System.Xml;

[ApiController]
[Route("api/rss")]
public class RssController : ControllerBase
{
    [HttpGet]
    public IActionResult GetRssFeed(string url)
    {
        using (var reader = XmlReader.Create(url))
        {
            var feed = SyndicationFeed.Load(reader);
            var items = feed.Items.Select(item => new
            {
                Title = item.Title.Text,
                Description = item.Summary?.Text,
                Link = item.Links.FirstOrDefault()?.Uri.ToString(),
                PublishDate = item.PublishDate
            }).ToList();

            return Ok(items);
        }
    }
}
```


# RSS на Angular

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseString } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor(private http: HttpClient) { }

  getRssFeed(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(xml => {
        let json;
        parseString(xml, { explicitArray: false }, (err, result) => {
          if (err) {
            throw new Error('Error parsing XML');
          }
          json = result;
        });
        return json;
      })
    );
  }
}
```


# ICS

```
import { createEvent } from 'ics';

const { error, value } = createEvent({
  title: 'My Event',
  description: 'This is a test event',
  start: [2023, 10, 15, 10, 0], // Год, месяц, день, час, минута
  end: [2023, 10, 15, 12, 0],
});

if (!error) {
  const blob = new Blob([value], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'event.ics';
  link.click();
  URL.revokeObjectURL(url);
}
```

# Ручное создание ics

```
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

const blob = new Blob([icsContent], { type: 'text/calendar' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'event.ics';
link.click();
URL.revokeObjectURL(url);
```

# vCard

```ts
import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-employee-qr',
  template: `
    <div *ngFor="let employee of employees">
      <p>{{ employee.name }}</p>
      <qrcode [qrdata]="getVCardData(employee)" [width]="256" [errorCorrectionLevel]="'M'"></qrcode>
    </div>
  `,
})
export class EmployeeQrComponent {
  employees = [
    { name: 'Иван Иванов', phone: '1234567890', email: 'ivan.ivanov@example.com', title: 'Разработчик', org: 'Компания' },
    // другие работники
  ];

  getVCardData(employee: any): string {
    return `BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
ORG:${employee.org}
TITLE:${employee.title}
TEL:${employee.phone}
EMAIL:${employee.email}
END:VCARD`;
  }
}
```

# QRCode Angular

```html
<div *ngFor="let employee of employees">
  <p>{{ employee.name }}</p>
  <button (click)="showQrCode(employee)">Показать QR-код</button>
  <div *ngIf="selectedEmployee === employee">
    <qrcode [qrdata]="getVCardData(employee)" [width]="256" [errorCorrectionLevel]="'M'"></qrcode>
  </div>
</div>
```

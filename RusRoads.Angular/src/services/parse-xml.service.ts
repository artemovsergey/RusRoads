import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParseXmlService {

  http = inject(HttpClient);

  private url = 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'

  getRssFeed(): Observable<any>
  {
    return this.http.get(this.url, {responseType:'text'}).pipe(
      map((xmlString) => this.parseXml(xmlString))
    );

  }

  private parseXml(xmlString: string):any
  {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'text/xml');
    
    const items = 
      Array.from(xml.querySelectorAll('item'));
      console.log(items)
      return items.map((item) => {
        // Извлекаем media:content с использованием пространства имен
        const mediaContent = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0];
        const mediaUrl = mediaContent ? mediaContent.getAttribute('url') : '';
  
        return {
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.textContent || '',
          description: item.querySelector('description')?.textContent || '',
          url: mediaUrl, // Добавляем URL медиа
        };
      });
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParseXmlService {

  http = inject(HttpClient);

  private url = 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'

  getRssFeed():Observable<any>
  {
    return this.http.get(this.url,{responseType:'text'}).pipe(
      map((xmlString) => this.parseXml(xmlString))
    );

  }
  private parseXml(xmlString: string):any
  {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString,'text/xml');
    
    const items = 
      Array.from(xml.querySelectorAll('item'));
      console.log(items)
      return items.map((item) => ({
        title: item.querySelector('title')?.textContent||'',
        link: item.querySelector('link')?.textContent||'',
        description: item.querySelector('description')?.textContent||''
      }));

  }

  constructor() { }
}

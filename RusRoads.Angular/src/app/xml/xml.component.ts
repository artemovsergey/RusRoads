import { Component, inject, OnInit } from '@angular/core';
import { ParseXmlService } from '../../services/parse-xml.service';

@Component({
  selector: 'app-xml',
  imports: [],
  templateUrl: './xml.component.html',
  styleUrl: './xml.component.scss'
})
export class XmlComponent implements OnInit {
  rssItems:any[] =[]
  
  xmlService = inject(ParseXmlService) 
  ngOnInit(): void {
    console.log("xml")
    this.xmlService.getRssFeed().subscribe({
      next: data => this.rssItems = data,
      error: error => console.log(error)
      
    })
  } 

}

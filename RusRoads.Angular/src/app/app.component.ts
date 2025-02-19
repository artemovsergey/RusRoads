import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxGraphModule} from '@swimlane/ngx-graph'
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NgxGraphModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {

  nodes: any[] = [];
  links: any[] = [];

  testData = [
    { id: 1, name: 'Главное подразделение', head_id: 1 },
    { id: 2, name: 'Подразделение A', head_id: 1 },
    { id: 3, name: 'Подразделение B', head_id: 1 },
    { id: 4, name: 'Подразделение C', head_id: 2 },
  ];

  ngOnInit(): void {
    this.prepareData(this.testData);
    console.log('Nodes:', this.nodes);
    console.log('Links:', this.links);
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

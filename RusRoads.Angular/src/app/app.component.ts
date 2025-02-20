import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DagreLayout, NgxGraphModule, Orientation } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxGraphModule],
  template: `
    <div style="width: 800px; height: 600px; border: 1px solid red;">
      <ngx-graph
        [view]="[800, 600]"
        [nodes]="nodes"
        [links]="links"
        [layout]="layout"
        [enableZoom]="true"
        [autoZoom]="true"
       >

        <ng-template #defsTemplate>
          <svg:marker id="arrow" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="4" markerHeight="4" orient="auto">
            <svg:path d="M0,-5L10,0L0,5" class="arrow-head" />
          </svg:marker>
        </ng-template>

        <ng-template #nodeTemplate let-node>
          <svg:g class="node">
            <svg:rect
              [attr.width]="200"
              [attr.height]="40"
              fill="#f9f9f9"
              stroke="#ccc"
              stroke-width="1"
              (click)="onNodeClick(node)"
            />
            <svg:text (click)="onNodeClick(node)" alignment-baseline="central" [attr.x]="10" [attr.y]="20">
              {{ node.label }}
            </svg:text>
          </svg:g>
        </ng-template>

        <ng-template #linkTemplate let-link>
          <svg:g class="edge">
            <svg:path class="line" stroke-width="2" marker-end="url(#arrow)"></svg:path>
          </svg:g>
        </ng-template>
      </ngx-graph>
    </div>
  `,
})
export class AppComponent implements OnInit {
  onNodeClick(node: any) {
    console.log(node.id)
  }

  nodes: any[] = [];
  links: any[] = [];
  layout = new DagreLayout(); // Используем DagreLayout



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
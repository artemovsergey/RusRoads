import { Component, inject } from '@angular/core';
import { DagreLayout, NgxGraphModule, Orientation } from '@swimlane/ngx-graph';
import { ParseXmlService } from '../../services/parse-xml.service';
import { CommonModule } from '@angular/common';
import { SubdivisonsService } from '../../services/subdivisons.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-subdivisions',
  standalone: true,
  imports: [CommonModule, NgxGraphModule],
  templateUrl: './subdivisions.component.html',
  styleUrl: './subdivisions.component.scss'
})
export class SubdivisionsComponent {

  subdivisions: any[] = []

  nodes: any[] = [];
  links: any[] = [];
  layout = new DagreLayout();

  subdivisionService = inject(SubdivisonsService)

  // getEmployeeBySub(node: any) {
  //     this.subdivisionService.getEmployee(node.id).subscribe(r => {console.log(r); this.subdivisionService.emp$.next(r) } )
  // }

  getEmployeeBySub(node: any) {
    this.subdivisionService.getEmployee(node.id).pipe(
      tap(r => console.log(r)),
      tap(r => this.subdivisionService.emp$.next(r)),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return of([]); // Возвращаем пустой массив в случае ошибки
      })
    ).subscribe();
  }

  ngOnInit(): void {

    this.subdivisionService.getll().subscribe( r => {this.subdivisions = r;this.prepareData(r)} )
    console.log(this.subdivisions)
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
        .filter((item) => item.head_subdivision_id !== 0 )
        .map((item) => ({
          source: item.head_subdivision_id.toString(),
          target: item.id.toString(),
        }));
    }


}

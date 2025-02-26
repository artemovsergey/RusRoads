import { Component, inject, OnInit } from '@angular/core';
import { DagreLayout, NgxGraphModule, Orientation } from '@swimlane/ngx-graph';
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
export class SubdivisionsComponent implements OnInit {

  nodes: any[] = [];
  links: any[] = [];
  layout = new DagreLayout();

  subdivisionService = inject(SubdivisonsService)

  ngOnInit() {
    this.subdivisionService.getll().subscribe( r => { this.prepareData(r) } )
    this.layout.settings.orientation = Orientation.TOP_TO_BOTTOM
  }

  // getEmployeeBySub(node: any) {
  //     this.subdivisionService.getEmployee(node.id).subscribe(r => {console.log(r); this.subdivisionService.emp$.next(r) } )
  // }

  getEmployeesAllBySub(node: any) {

    // рассылаем текущее подразделение
    this.subdivisionService.currentSubId$.next(node.id)

    // получаем связанных сотрудников по узлу
    this.subdivisionService.getEmployeesAll(node.id).pipe(
      tap(r => { console.log(r)}),
      tap(r => this.subdivisionService.employeesAll$.next(r)),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return of([]); // Возвращаем пустой массив в случае ошибки
      })
    ).subscribe();
  }

  // подготовка данных для отображения в виде графа
  prepareData(data: any[]) {
    this.nodes = data.map((item) => ({
      id: item.id.toString(),
      label: item.name,
    }));

    this.links = data
      .filter((item) => item.head_subdivision_id !== null )
      .map((item) => ({
        source: item.head_subdivision_id.toString(),
        target: item.id.toString(),
      }));

  }

  // сокращение имен, чтобы название не выходило за прямоугольник
  shortTitle(title: String){
    var splitArr = title.trim().split(" ")
    var resultArr: string[] = []
    splitArr.forEach(e => {
      resultArr.push(e.slice(0,3))
    });
    return resultArr.join(".").toUpperCase().slice(0,7)
  }


}

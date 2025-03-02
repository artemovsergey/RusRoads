import { Component } from '@angular/core';

import { SubdivisionsComponent } from '../subdivisions/subdivisions.component';
import { EmpoyeesComponent } from '../employees/employees.component';

@Component({
  selector: 'app-home',
  imports: [EmpoyeesComponent, SubdivisionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

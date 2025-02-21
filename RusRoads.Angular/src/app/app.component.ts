import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { QRCodeComponent } from 'angularx-qrcode';
import { EmpoyeesComponent } from "./empoyees/empoyees.component";
import { HeaderComponent } from "./header/header.component";
import { SubdivisionsComponent } from "./subdivisions/subdivisions.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxGraphModule, QRCodeComponent, EmpoyeesComponent, HeaderComponent, SubdivisionsComponent],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
  
})

export class AppComponent {

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, NgxGraphModule, HeaderComponent],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
  
})

export class AppComponent {

}
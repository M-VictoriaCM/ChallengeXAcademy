import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-grid-player',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './grid-player.component.html',
  styleUrl: './grid-player.component.css'
})
export class GridPlayerComponent{
  @Input() player: any;  
}

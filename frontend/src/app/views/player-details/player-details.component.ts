import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';


@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css'
})

export class PlayerDetailsComponent implements OnInit{
  playerId: number | null = null;
  player: any = {};

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.playerId = +id;
        this.getPlayers();
      }
    });
  }

  getPlayers(): void {
    if (!this.playerId) {
      return;
    }
    this.playerService.getPlayer(this.playerId).subscribe(
      (data) => {
        this.player = data;
      },
      (error) => {
        console.error('Error al cargar los detalles');
      }
    );
  }
}


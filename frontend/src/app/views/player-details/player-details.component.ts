import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import {
  Chart,
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

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
  @ViewChild('skillsChart', { static: true }) skillsChartRef!: ElementRef;

  playerId: number | null = null;
  player: any = {};
  skillsChart: any;


  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) { }

 
  ngOnInit(): void {
    // Registrar componentes de Chart.js
    Chart.register(
      RadialLinearScale,
      RadarController,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
      Legend
    );

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.playerId = +id;
        this.getPlayer();
      }
    });
  }
  getPlayer(): void {
    if (!this.playerId) {
      return;
    }
    this.playerService.getPlayer(this.playerId).subscribe(
      data => {
        this.player = data;
        if (
          data.potential &&
          data.work_rate &&
          data.overall &&
          data.skill_moves &&
          data.international_reputation
        ) {
          // Crear el gráfico después de obtener los datos
          this.createRadarChart(data);
        } else {
          console.error('Faltan atributos necesarios en los datos del jugador');
        }
      },
      error => {
        console.error('Error al cargar los detalles del jugador:', error);
      }
    );
  }

  createRadarChart(playerData: any): void {
    // Verificar que el canvas esté disponible
    if (!this.skillsChartRef || !this.skillsChartRef.nativeElement) {
      console.error('El canvas no está disponible');
      return;
    }

    const ctx = this.skillsChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas');
      return;
    }

    this.skillsChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Potential', 'Work Rate', 'Overall', 'Skill Moves', 'International Reputation'],        
        datasets: [
          {
            label:`${playerData.short_name} cualidades`,
            data: [
              playerData.potential,
              playerData.work_rate,
              playerData.overall,
              playerData.skill_moves,
              playerData.international_reputation
            ],
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            },
            pointLabels: {
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }

  
}


import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './player-create.component.html',
  styleUrl: './player-create.component.css'
})
export class PlayerCreateComponent implements OnInit{
  playerForm!: FormGroup;

  

  constructor(private playerService: PlayerService, private router: Router){}
  ngOnInit(): void {
    this.playerForm = new FormGroup({
      fifa_version: new FormControl('', Validators.required),
      fifa_update: new FormControl('2'), // Valor por defecto
      player_face_url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      long_name: new FormControl('', Validators.required),
      short_name: new FormControl('', Validators.required),
      player_url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      player_positions: new FormControl('', Validators.required),
      overall: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
      potential: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
      age: new FormControl('', [Validators.required, Validators.min(15), Validators.max(50)]),
      height_cm: new FormControl('', Validators.min(100)), // Opcional
      weight_kg: new FormControl('', Validators.min(40)),  // Opcional
      preferred_foot: new FormControl(''), // Opcional
      body_type: new FormControl(''),      // Opcional
      nationality_name: new FormControl('', Validators.required),
      club_name: new FormControl('sin club'), // Valor por defecto
      skill_moves: new FormControl(''), // Opcional
      international_reputation: new FormControl(''), // Opcional
      work_rate: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.playerForm.valid) {
      this.playerService.createPlayer(this.playerForm.value).subscribe({
        next: (response) => {
          console.log('Jugador creado:', response);
          this.router.navigate(['/home']); // Redirigir al Home después de crear
        },
        error: (error) => {
          console.error('Error al crear el jugador:', error);
        },
      });
    } else {
      console.error('El formulario no es válido');
    }
  }
  
  
  cancel(): void {
    this.router.navigate(['/']); // Redirige al Home
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.css'
})
export class PlayerEditComponent implements OnInit{
  playerForm!: FormGroup; 
  playerId: number | null = null; 
  isEditMode = false; 

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Inicializar el formulario correctamente
    this.playerForm = this.formBuilder.group({
      fifa_version: ['', Validators.required],
      fifa_update: ['', Validators.required],
      player_face_url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      long_name: ['', Validators.required],
      short_name: ['', Validators.required],
      player_url: [''],
      player_positions: [0],
      overall: [0],
      potential: [0],
      age: [0],
      height_cm: [0],
      weight_kg: [0],
      preferred_foot: [''],
      body_type: [''],
      nationality_name: ['', Validators.required],
      club_name: [''],
      skill_moves: [0],
      international_reputation: [0],
      work_rate: ['', Validators.required]
    });

    // Obtener el `playerId` desde la ruta
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.playerId = id ? +id : null;
      if (this.playerId) {
        this.fetchPlayerData();
      }
    });
  }

  fetchPlayerData(): void {
    if (this.playerId) {
      this.playerService.getPlayer(this.playerId).subscribe(
        (playerData) => {
          this.isEditMode = true; // Cambia a modo edición
          this.playerForm.patchValue(playerData); // Rellena el formulario con los datos obtenidos
        },
        (error) => {
          console.error('Error al obtener los datos del jugador:', error);
          this.isEditMode = false; // Sigue en modo creación si hay un error
        }
      );
    }
  }

  onSubmit(): void {
    if (this.playerForm.invalid) {
      return; // Evita la acción si el formulario es inválido
    }

    if (this.isEditMode) {
      // Actualizar jugador existente
      this.playerService.updatePlayer(this.playerId!, this.playerForm.value).subscribe(
        (response) => {
          console.log('Jugador actualizado:', response);
          this.resetForm();
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Error al actualizar el jugador:', error);
        }
      );
    } else {
      // Crear un nuevo jugador
      this.playerService.createPlayer(this.playerForm.value).subscribe(
        (response) => {
          console.log('Jugador creado:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear el jugador:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.playerForm.reset();
    this.isEditMode = false;
    this.playerId = null;
  }

  cancel(): void {
    this.router.navigate(['/players']); // Redirige a la lista de jugadores
  }    
}


import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './player-create.component.html',
  styleUrl: './player-create.component.css'
})
export class PlayerCreateComponent implements OnInit{

  playerForm = new FormGroup({
    fifa_version: new FormControl('', Validators.required),
  fifa_update_date: new FormControl('', Validators.required),
  fifa_update: new FormControl('', Validators.required),
  player_face_url: new FormControl('', Validators.required),
  long_name: new FormControl('', Validators.required),
  short_name: new FormControl('', Validators.required),
  player_positions: new FormControl('', Validators.required),
  overall: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
  age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
  height_cm: new FormControl('', Validators.required),
  weight_kg: new FormControl('', Validators.required),
  player_url: new FormControl('', Validators.required),
  club_name: new FormControl('', Validators.required),
  nationality_name: new FormControl('', Validators.required),
  potential: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
  skill_moves: new FormControl('', Validators.min(0)),
  international_reputation: new FormControl('', Validators.min(0)),
  work_rate: new FormControl('')
  });

  constructor(private playerService: PlayerService, private router: Router){}
  ngOnInit(): void {
    this.playerForm = new FormGroup({
      fifa_version: new FormControl('', Validators.required),
    fifa_update_date: new FormControl('', Validators.required),
    fifa_update: new FormControl('', Validators.required),
    player_face_url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]), // Validación de URL
    long_name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    player_positions: new FormControl('', Validators.required),
    overall: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
    age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
    height_cm: new FormControl('', Validators.required),
    weight_kg: new FormControl('', Validators.required),
    player_url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]), // También para URL
    club_name: new FormControl('', Validators.required),
    nationality_name: new FormControl('', Validators.required),
    potential: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
    skill_moves: new FormControl('', Validators.min(0)),
    international_reputation: new FormControl('', Validators.min(0)),
    work_rate: new FormControl('')
    });
  }

  onSubmit() {
    if (this.playerForm.valid) {
      this.playerService.createPlayer(this.playerForm.value).subscribe({
        next: (response) => {
          console.log('Player created successfully:', response);
          this.router.navigate(['/home']); // Redirigir al home después de crear el jugador
        },
        error: (err) => {
          console.error('Error creating player:', err);
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }
  
  cancel(): void {
    this.router.navigate(['/']); // Redirige al Home
  }

}

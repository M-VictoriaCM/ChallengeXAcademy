import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { GridPlayerComponent } from "../grid-player/grid-player.component";
import { PageSizeSelectorComponent } from "../../core/page-size-selector/page-size-selector.component";
import { PaginationComponent } from "../../core/pagination/pagination.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GridPlayerComponent,
    PageSizeSelectorComponent,
    PaginationComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
[x: string]: any;

  players: any[]=[]; //Almaceno los jugadores
  currentPage: number = 1;//pagina actual
  pageSize: number = 10;//Total de paginas
  totalPages: number = 10;//Cantidad de jugadores
 

  constructor(private playerService: PlayerService,
    private router: Router){ }
  
  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers(this.currentPage, this.pageSize)
    .subscribe(response => {
      console.log(response); // Verifica la estructura de la respuesta aquí
      this.players = response.players;
      this.totalPages = response.pagination.totalPages;
    }, error => {
      console.error("Error al cargar jugadores:", error);
    });
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPlayers();
    }
  }

  previousPage(): void {
    if(this.currentPage > 1){
      this.currentPage--;
      this.loadPlayers();
    }
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.loadPlayers();
    }
  }
  updatePageSize(newPageSize: number | null): void {
    if (newPageSize) {
      const pageSize = newPageSize;
      if (!isNaN(pageSize)) {
        this.pageSize = pageSize;
        this.currentPage = 1; // Reiniciar la página actual
        this.loadPlayers(); // Volver a cargar los jugadores
      }
    }
  }
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadPlayers(); // Recarga los datos con la nueva página
  }  
  goToCreate(): void {
    console.log('Redirigiendo a /player/create');
    this.router.navigate(['/player/create']);
  }
  
}

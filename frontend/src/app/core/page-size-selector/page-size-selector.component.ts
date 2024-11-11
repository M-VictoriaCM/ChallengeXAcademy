import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-size-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-size-selector.component.html',
  styleUrl: './page-size-selector.component.css'
})
export class PageSizeSelectorComponent {
  @Input() pageSize: number = 10;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  // Método para manejar el cambio de tamaño de página
  onPageSizeChange(newSize: Event): void {
    const target = newSize.target as HTMLSelectElement | null;
    if (target) {
      this.pageSizeChange.emit(Number(target.value)); // Emitir el nuevo tamaño
    }
  }
}

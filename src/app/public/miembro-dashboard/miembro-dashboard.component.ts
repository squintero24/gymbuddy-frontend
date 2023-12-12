import { Component } from '@angular/core';

@Component({
  selector: 'app-miembro-dashboard',
  templateUrl: './miembro-dashboard.component.html',
  styleUrls: ['./miembro-dashboard.component.scss']
})
export class MiembroDashboardComponent {
  seleccionActual: number | null = 1;

  opciones = [
    { id: 1, nombre: 'Entrenamientos' },
    { id: 2, nombre: 'Otro' }
  ];

  mostrarTarjeta(value:any): void {
    this.seleccionActual = value.target.value;
  }

}

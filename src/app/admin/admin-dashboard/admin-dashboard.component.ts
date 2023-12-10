import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  seleccionActual: number | null = 1;

  opciones = [
    { id: 1, nombre: 'Entrenamientos' },
    { id: 2, nombre: 'Usuarios' },
    { id: 3, nombre: 'Planes de entrenamiento' }
  ];

  mostrarTarjeta(value:any): void {
    this.seleccionActual = value.target.value;
    console.log(this.seleccionActual);
  }

}

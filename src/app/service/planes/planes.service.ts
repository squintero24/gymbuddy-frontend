import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../../shared/snackbar/service/snackbar.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  urlBackPlanes: String = 'http://localhost:8080/gymbuddy/api/planes';

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  crearPlan(plan:any){
    return this.http.post(this.urlBackPlanes+'/create',plan)
      .pipe(
        tap(
          {
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: 'Se creo el plan con exito.',
                  tipo: "success"
                })
              }
            },
            error: (error) => {
              this.snackbar.show({
                mensaje: 'Problema creando el plan.',
                tipo: "error"
              })
            }
          }
        )
      )
  }

  actualizarPlan(plan:any){
    return this.http.put(this.urlBackPlanes + '/update', plan)
      .pipe(
        tap(
          {
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: 'Se actualizo el plan con exito.',
                  tipo: "success"
                })
              }
            },
            error: (error) => {
              this.snackbar.show({
                mensaje: 'Problema actualizando el plan..',
                tipo: "error"
              })
            }
          }
        )
      )
  }

  deletePlan(id:number){
    return this.http.delete(this.urlBackPlanes + `/delete/${id}`)
    }

  getPlanes(){
    return this.http.get(this.urlBackPlanes + '/all');
  }
}

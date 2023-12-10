import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../../shared/snackbar/service/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  urlBackPlanes: String = 'http://localhost:8080/gymbuddy/api/planes';

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  getPlanes(){
    return this.http.get(this.urlBackPlanes + '/all');
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntrenamientoService} from "../../../../service/entrenamiento/entrenamiento.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-crear-editar-entrenamiento',
  templateUrl: './crear-editar-entrenamiento.component.html',
  styleUrls: ['./crear-editar-entrenamiento.component.scss']
})
export class CrearEditarEntrenamientoComponent implements OnInit{

  form: UntypedFormGroup;

  tituloModal:String = 'Crear entrenamiento';


  constructor(@Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder
    , private entrenamientoService: EntrenamientoService
    , private dialogRef: MatDialogRef<CrearEditarEntrenamientoComponent>
    , private datePipe: DatePipe) { }

  ngOnInit() {
    this.buildForm();
    if(this.data.mode === 'editar'){
      console.log(this.data.entrenamientoData)
      this.form.patchValue(this.data.entrenamientoData);
      this.tituloModal = 'Actualizar entrenamiento'
    }
  }

  submit(){
    if(this.form.valid){
      if(this.data.mode === 'editar'){
        this.entrenamientoService.actualizarEntrenamiento(this.form.value)
          .subscribe(
            () => {
              this.dialogRef.close();
            }
          );
      }else{
        this.entrenamientoService.crearEntrenamiento(this.form.value)
          .subscribe(
            () =>{
              this.dialogRef.close();
            }
          );
      }
    }
  }

  buildForm(){
    this.form = this.fb.group({
      id:[''],
      nombreClase: ['', Validators.required],
      descripcionClase: ['', Validators.required],
      inicioClase: ['', Validators.required],
      finClase: ['', Validators.required],
      foto:  ['', Validators.required]
    });}
}

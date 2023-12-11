import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../service/user/user.service";
import {PlanesService} from "../../../../service/planes/planes.service";

@Component({
  selector: 'app-crear-editar-plan',
  templateUrl: './crear-editar-plan.component.html',
  styleUrls: ['./crear-editar-plan.component.scss']
})
export class CrearEditarPlanComponent implements OnInit{

  form: UntypedFormGroup;

  tituloModal:String = 'Crear Plan';


  constructor(@Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder
    , private planService: PlanesService
    , private dialogRef: MatDialogRef<CrearEditarPlanComponent>) { }

  ngOnInit() {
    this.buildForm();
    if(this.data.mode === 'editar'){
      this.form.patchValue(this.data.planData);
      this.tituloModal = 'Actualizar plan'
    }
  }

  submit(){
    if(this.form.valid){
      if(this.data.mode === 'editar'){
        this.planService.actualizarPlan(this.form.value)
          .subscribe(
            () => {
              this.dialogRef.close();
            }
          );
      }else{
        this.planService.crearPlan(this.form.value)
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
      name: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
    });}
}

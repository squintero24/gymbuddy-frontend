import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from "../../../../interface/user.dto";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user/user.service";

@Component({
  selector: 'app-crear-editar-usuario',
  templateUrl: './crear-editar-usuario.component.html',
  styleUrls: ['./crear-editar-usuario.component.scss']
})
export class CrearEditarUsuarioComponent implements OnInit{

  form: UntypedFormGroup;

  tiposDocumentos: any;

  tiposRoles: any;

  planes: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
              , private fb: FormBuilder
              , private userService: UserService
              , private dialogRef: MatDialogRef<CrearEditarUsuarioComponent>) { }

  ngOnInit() {
    this.buildForm();
    this.loadData()
    if(this.data.mode === 'editar'){
      console.log(this.data.userData)
      this.form.patchValue(this.data.userData);
      console.log(this.form.value)
    }
  }

  loadData(): void {
    this.userService.getDocuments().subscribe(
      (result) => {
        this.tiposDocumentos = result;
      },
      (error) => {
        console.error('Error al obtener tipos doc', error);
      }
    );

    this.userService.getRoles().subscribe(
      (result) => {
        this.tiposRoles = result;
      },
      (error) => {
        console.error('Error al obtener roles', error);
      }
    );
    this.userService.getPlans().subscribe(
      (result) => {
        this.planes = result;
      },
      (error) => {
        console.error('Error al obtener planes', error);
      }
    );
  }

  submit(){
    if(this.form.valid){
      this.userService.crearPersona(this.form.value)
        .subscribe(
          (res) => {
            this.dialogRef.close();
          }
        );
    }
  }

  buildForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      neighborhood: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      numDocument: ['', Validators.required],
      idTipoDocumento: ['', Validators.required],
      idPlan: ['', Validators.required],
      idRol: ['', Validators.required],
      photo: [''],
      fechaDesdePlan: ['',Validators.required],
      fechaHastaPlan: ['',Validators.required],
    });}

  /*compareFn(op1, op2) {
    return op1.id === op2.id;
  }*/


}

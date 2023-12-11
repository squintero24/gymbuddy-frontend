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

  tituloModal:String = 'Crear User';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
              , private fb: FormBuilder
              , private userService: UserService
              , private dialogRef: MatDialogRef<CrearEditarUsuarioComponent>) { }

  ngOnInit() {
    this.buildForm();
    this.loadData();
    if(this.data.mode === 'editar'){
      this.tituloModal = 'Actualizar User';
      //buscar el ultimo plan que tiene el usuario
      const ultimoPlanUser = this.data.userData.plansDto.sort((a:any, b:any) => {
        return a.endDate - b.endDate;
      })[0];
      //formulario
      this.form.patchValue(this.data.userData);
      //fechas
      this.form.get('fechaDesdePlan')?.setValue(ultimoPlanUser.startDate);
      this.form.get('fechaHastaPlan')?.setValue(ultimoPlanUser.endDate);
      //Otros atributos:
      this.form.get('extenderPlan')?.setValue(false);
      this.form.get('cambiarPlan')?.setValue(false);
      this.form.get('cambiarRol')?.setValue(false);
      //Se desactivan los campos que por defecto van a estar desactivados.
      this.form.get('idRol')?.disable();
      this.form.get('idPlan')?.disable();
      this.form.get('fechaDesdePlan')?.disable();
      this.form.get('fechaHastaPlan')?.disable();
    }

    this.onChanges();
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

  onChanges(){
    //Id rol
    this.form.controls['cambiarRol'].valueChanges.subscribe((value) => {
      if(value){
        this.form.get('idRol')?.enable();
      }else{
        this.form.get('idRol')?.disable();
      }
    });
    //Id Plan: EXTENDER
    this.form.controls['extenderPlan'].valueChanges.subscribe((value) => {
      if(value){
        this.form.get('cambiarPlan')?.setValue(false);
        this.form.get('fechaDesdePlan')?.enable();
        this.form.get('fechaHastaPlan')?.enable();
      }else{
        this.form.get('fechaDesdePlan')?.disable();
        this.form.get('fechaHastaPlan')?.disable();
      }
    });
    //Id Plan: CAMBIAR
    this.form.controls['cambiarPlan'].valueChanges.subscribe((value) => {
      if(value){
        this.form.get('extenderPlan')?.setValue(false);
        this.form.get('idPlan')?.enable();
        this.form.get('fechaDesdePlan')?.enable();
        this.form.get('fechaHastaPlan')?.enable();
      }else{
        this.form.get('idPlan')?.disable();
        this.form.get('fechaDesdePlan')?.disable();
        this.form.get('fechaHastaPlan')?.disable();
      }
    });
  }

  submit(){
    if(this.form.valid){
      if(this.data.mode === 'editar'){
        this.userService.crearPersona(this.form.value)
          .subscribe(
            () => {
              this.dialogRef.close();
            }
          );
      }else{
        this.userService.actualizarPersona(this.form.value)
          .subscribe(
            () => {
              this.dialogRef.close();
            }
          );
      }
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
      extenderPlan: [false],
      cambiarPlan: [false],
      cambiarRol: [false],
      photo: ['', Validators.required],
      fechaDesdePlan: ['',Validators.required],
      fechaHastaPlan: ['',Validators.required],
    });}

}

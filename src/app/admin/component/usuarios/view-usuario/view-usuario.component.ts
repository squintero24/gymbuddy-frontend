import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user/user.service";

@Component({
  selector: 'app-view-usuario',
  templateUrl: './view-usuario.component.html',
  styleUrls: ['./view-usuario.component.scss']
})
export class ViewUsuarioComponent implements OnInit{

  form: UntypedFormGroup;

  tiposDocumentos: any;

  tiposRoles: any;

  planes: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private fb: FormBuilder){};

  ngOnInit() {
    this.buildForm();
    this.loadData();
    //formulario
    this.form.patchValue(this.data.row);
    //fechas
    this.form.get('fechaDesdePlan')?.setValue(this.data.row.userPlan.startDate);
    this.form.get('fechaHastaPlan')?.setValue(this.data.row.userPlan.endDate);
    //id plan actual
    this.form.get('idPlan')?.setValue(this.data.row.userPlan.idPlan);
    //id rol actual
    this.form.get('idRol')?.setValue(this.data.row.userRol.idRol);
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

  buildForm(){
    this.form = this.fb.group({
      id: [''],
      name: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      neighborhood: [{ value: '', disabled: true }],
      birthDate: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }],
      numDocument: [{ value: '', disabled: true }],
      idTipoDocumento: [{ value: '', disabled: true }],
      idPlan: [{ value: '', disabled: true }],
      idRol: [{ value: '', disabled: true }],
      fechaDesdePlan: [{ value: '', disabled: true }],
      fechaHastaPlan: [{ value: '', disabled: true }],
    });}

}

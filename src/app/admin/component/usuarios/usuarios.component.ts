import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserDto} from "../../../interface/user.dto";
import {UserService} from "../../../service/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserInfoComponent} from "../../../public/header/user-info/user-info.component";
import {CrearEditarUsuarioComponent} from "./crear-editar-usuario/crear-editar-usuario.component";
import {ConfirmService} from "../../../shared/confirm/service/confirm.service";
import {SnackbarService} from "../../../shared/snackbar/service/snackbar.service";
import {ViewPlanesComponent} from "../planes/view-planes/view-planes.component";
import {ViewUsuarioComponent} from "./view-usuario/view-usuario.component";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements  OnInit{

  displayedColumns: string[] = ['name', 'lastName', 'numDocument', 'email' , "actions"];
  dataSource!: MatTableDataSource<UserDto>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get userInfo(): UserDto {
    const userSaved = localStorage.getItem('userData');
    return JSON.parse(userSaved || '{}');
  }


  constructor(private userService: UserService,
              private dialog: MatDialog,
              private confirm:ConfirmService,
              private snackbar: SnackbarService) {
  }

  ngOnInit() {
    this.refresh();
  }

  onDelete(row: any) {
    const optionsConfirm = {
      title: 'Eliminar',
      message: `Desea borrar a ${row.name} ${row.lastName} con numero documento ${row.numDocument} `, //se espera que agreguen getCategoriaById,
      cancelText: 'Cancelar',
      confirmText: 'Borrar'
    }

    this.confirm.open(optionsConfirm);
    this.confirm.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.userService.deletePersona(row.id).subscribe(
          {
            next: (resp: any) => {
              this.refresh();
              this.snackbar.show(
                {
                  mensaje: 'Usuario eliminado correctamente',
                  tipo: 'success'
                }
              );
            },
            error: (res => {
              this.snackbar.show(
                {
                  mensaje: 'No se pudo eliminar el usuario.',
                  tipo: 'error'
                }
              );
            })
          }
        )
      }
    })
  }

  view(row:any){
    this.dialog.open(ViewUsuarioComponent, {
      width: '900px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { row }
    })
  }

  refresh(){
    this.userService.getUsers().subscribe((data) => {
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateEditUser(mode: 'crear' | 'editar', userData?: any){
    this.dialog.open(CrearEditarUsuarioComponent, {
      width: '600px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { mode, userData }
    }).afterClosed().subscribe(
      () => {
        this.refresh();
      }
    )
  }
}

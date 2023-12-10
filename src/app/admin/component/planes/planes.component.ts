import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserDto} from "../../../interface/user.dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EntrenamientoService} from "../../../service/entrenamiento/entrenamiento.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmService} from "../../../shared/confirm/service/confirm.service";
import {SnackbarService} from "../../../shared/snackbar/service/snackbar.service";
import {CrearEditarUsuarioComponent} from "../usuarios/crear-editar-usuario/crear-editar-usuario.component";
import {PlanesService} from "../../../service/planes/planes.service";

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit{

  displayedColumns: string[] = ['name', 'description', 'value', 'creationDate' , 'updateDate',  "actions"];
  dataSource!: MatTableDataSource<UserDto>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private planesService: PlanesService,
              private dialog: MatDialog,
              private confirm:ConfirmService,
              private snackbar: SnackbarService) {
  }

  ngOnInit() {
    this.refresh();
  }

  onEdit(row: any){
    console.log(row);
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
        this.planesService.getPlanes().subscribe(
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
    console.log(row);
  }

  refresh(){
    this.planesService.getPlanes().subscribe((data) => {
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

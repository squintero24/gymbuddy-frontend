import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserDto} from "../../../interface/user.dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../service/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmService} from "../../../shared/confirm/service/confirm.service";
import {SnackbarService} from "../../../shared/snackbar/service/snackbar.service";
import {CrearEditarUsuarioComponent} from "../usuarios/crear-editar-usuario/crear-editar-usuario.component";
import {EntrenamientoService} from "../../../service/entrenamiento/entrenamiento.service";
import {CrearEditarEntrenamientoComponent} from "./crear-editar-entrenamiento/crear-editar-entrenamiento.component";
import {DatePipe} from "@angular/common";
import {ViewPlanesComponent} from "../planes/view-planes/view-planes.component";
import {ViewEntrenamientoComponent} from "./view-entrenamiento/view-entrenamiento.component";

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss']
})
export class EntrenamientoComponent implements OnInit{

  displayedColumns: string[] = ['nombreClase', 'descripcionClase', 'inicioClase', 'finClase' , "actions"];
  dataSource!: MatTableDataSource<UserDto>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private entrenamientoService: EntrenamientoService,
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
      message: `Desea borrar ${row.nombreClase} `,
      cancelText: 'Cancelar',
      confirmText: 'Borrar'
    }

    this.confirm.open(optionsConfirm);
    this.confirm.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.entrenamientoService.deleteEntrenamiento(row.id).subscribe(
          {
            next: (resp: any) => {
              this.refresh();
              this.snackbar.show(
                {
                  mensaje: 'Entrenamiento eliminado correctamente',
                  tipo: 'success'
                }
              );
            },
            error: (res => {
              this.snackbar.show(
                {
                  mensaje: 'No se pudo eliminar el entrenamiento.',
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
    this.dialog.open(ViewEntrenamientoComponent, {
      width: '1200px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { row }
    })
  }


  refresh(){
    this.entrenamientoService.getEntrenamientos().subscribe((data) => {
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

  openCreateEditUser(mode: 'crear' | 'editar', entrenamientoData?: any){
    this.dialog.open(CrearEditarEntrenamientoComponent, {
      width: '600px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { mode, entrenamientoData }
    }).afterClosed().subscribe(
      () => {
        this.refresh();
      }
    )
  }
}

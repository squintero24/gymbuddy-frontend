import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewEntrenamientoComponent } from 'src/app/admin/component/entrenamiento/view-entrenamiento/view-entrenamiento.component';
import { UserDto } from 'src/app/interface/user.dto';
import { EntrenamientoService } from 'src/app/service/entrenamiento/entrenamiento.service';
import { ConfirmService } from 'src/app/shared/confirm/service/confirm.service';
import { SnackbarService } from 'src/app/shared/snackbar/service/snackbar.service';

@Component({
  selector: 'app-mis-entrenamientos',
  templateUrl: './mis-entrenamientos.component.html',
  styleUrls: ['./mis-entrenamientos.component.scss']
})
export class MisEntrenamientosComponent implements OnInit{
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

  view(row:any){
    this.dialog.open(ViewEntrenamientoComponent, {
      width: '1200px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { row }
    })
  }


  dataInscripcion={

  }

  get userInfo(): UserDto {
    const userSaved = localStorage.getItem('userData');
    return JSON.parse(userSaved || '{}');
  }
  inscribirEntreno(row: any) {
    const optionsConfirm = {
      title: 'Inscribirse al entrenamiento',
      message: `Desea inscribirse a la clase: ${row.nombreClase} `,
      cancelText: 'Cancelar',
      confirmText: 'Inscribirse'
    };
    const  dataInscripcion={
      idUser: this.userInfo.id,
      idTraining: row.id
    };

    this.confirm.open(optionsConfirm);
    this.confirm.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.entrenamientoService.inscribirAEntrenamiento(dataInscripcion).subscribe(
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
}

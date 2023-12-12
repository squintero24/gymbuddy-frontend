import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

}

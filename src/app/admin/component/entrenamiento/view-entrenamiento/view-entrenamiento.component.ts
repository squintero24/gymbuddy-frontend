import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserDto} from "../../../../interface/user.dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-view-entrenamiento',
  templateUrl: './view-entrenamiento.component.html',
  styleUrls: ['./view-entrenamiento.component.scss']
})
export class ViewEntrenamientoComponent implements OnInit{

  displayedColumns: string[] = ['nombreUser', 'nombre', 'apellido'];
  dataSource!: MatTableDataSource<any>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){};

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.posts = this.data.row.usuarioInscritos;
    this.dataSource = new MatTableDataSource(this.posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

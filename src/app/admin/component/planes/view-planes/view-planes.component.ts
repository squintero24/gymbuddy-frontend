import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserDto} from "../../../../interface/user.dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-view-planes',
  templateUrl: './view-planes.component.html',
  styleUrls: ['./view-planes.component.scss']
})
export class ViewPlanesComponent implements OnInit{

  displayedColumns: string[] = ['userName', 'startDate', 'endDate'];
  dataSource!: MatTableDataSource<any>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){};

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.posts = this.data.row.usuariosPlan;
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

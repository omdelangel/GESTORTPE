import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { DashboardService } from './../../_services/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { EstadoProceso } from './../../_models';


@Component({
  selector: 'app-estado-proceso',
  templateUrl: './estado-proceso.component.html',
  styleUrls: ['./estado-proceso.component.scss']
})
export class EstadoProcesoComponent implements OnInit {

  displayedColumns = ['Fluo',
                      'Estado',
                      'Estatus',
                      'Tramite',
                      ];                      
  dataSource!: MatTableDataSource<EstadoProceso>;

  //private dataSource : [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dash : DashboardService) {

   }

  ngOnInit(): void {
    this.dash.obtenDashboard(5)
    .pipe(first()).subscribe((dataList : any) => {
      console.log('estado-proceso')
      this.dataSource           = new MatTableDataSource(dataList['datos'][0]);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;

    })
  }

}

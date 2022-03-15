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

  displayedColumns = ['Flujo',
                      'Estado',
                      'Estatus',
                      'Tramites',
                      ];                      
  dataSource!: MatTableDataSource<EstadoProceso>;

  //private dataSource : [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dash : DashboardService) {
    this.dash.obtenDashboard(5)
    .pipe(first()).subscribe((dataList : any) => {
      this.dataSource           = new MatTableDataSource(dataList['datos'][0]);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;

    });
   }
   
   ngAfterViewInit(){
      
   }

  ngOnInit(): void {
    
  }  
    
  

}

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
      console.log('estado-proceso')
      console.log(dataList['datos'][0])
      this.dataSource           = new MatTableDataSource(dataList['datos'][0]);
      //console.log(this.dataSource);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;

    });
   }
   
   ngAfterViewInit(){
      
   }

  ngOnInit(): void {
    
  }  
    /*
    
    var userdata : EstadoProceso[] = [];
    var  edoProc : EstadoProceso ;

    for (let i = 1; i <= 15; i++) { 
      edoProc = new EstadoProceso({"Flujo" : 'Solicitud',"Estado": 'Preregistro',"Estatus": 'Activo',"Tramites":i});
      userdata.push(edoProc);
      
     };
     this.dataSource           = new MatTableDataSource(userdata);
     //console.log(this.dataSource);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort      = this.sort;
    */
  
  

}

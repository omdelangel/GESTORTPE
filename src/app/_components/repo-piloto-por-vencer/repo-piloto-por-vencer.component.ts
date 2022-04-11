import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { RepoPilotoPorVencer } from '../../_models';
import { CatalogosService, ReportesService, ExcelService } from '../../_services';
import { first } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export default class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-repo-piloto-por-vencer',
  templateUrl: './repo-piloto-por-vencer.component.html',
  styleUrls: ['./repo-piloto-por-vencer.component.scss']
})
export class RepoPilotoPorVencerComponent implements OnInit {
  private readonly notifier: NotifierService;
  
  hoyDate      : Date = new Date();

  displayedColumns = [
                      'IdConcesionario', 
                      'NombreCompleto', 
                      'Telefono', 
                      'email', 
                      'NombreSM', 
                      'NombreM', 
                      'IdVehiculo', 
                      'Placa', 
                      'FechaInicio', 
                      'FechaTermino', 
                      ];
  dataSource!: MatTableDataSource<RepoPilotoPorVencer>;

    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    reactiveForm!        : FormGroup;
    repoPilotoPorVencer  : RepoPilotoPorVencer[] = [];
    matcher              = new MyErrorStateMatcher();
    submitted            = false;
    fileName             : string = "";


  constructor(
    private repoService      : ReportesService,
    notifierService          : NotifierService,
    private excelService     : ExcelService) { 
    this.notifier            = notifierService;
    }

  ngOnInit(): void {

    this.getReportePilotoPorVencer();
  }


  applyFilter(filterValue: string) {

      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  exportAsXLSX():void {

      this.fileName = "ReportePilotoPorVencer" + "-" + moment(this.hoyDate).format('YYYY-MM-DD');
      this.excelService.exportAsExcelFile(this.repoPilotoPorVencer, this.fileName);
    }

  getReportePilotoPorVencer(){
      this.submitted = true;  
   
      this.repoService.getReportePilotoPorVencer() 
      .pipe(first())
      .subscribe(data => {
 
        console.log("regresé del reporte piloto por vencer")
        console.log(data)
        if (data.estatus && !isEmpty(data.LPVPilotossLista[0])) {
  
          // Assign the data to the data source for the table to render
          this.repoPilotoPorVencer = data.LPVPilotossLista;
  
          this.dataSource = new MatTableDataSource(this.repoPilotoPorVencer);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
          var elemReport = document.getElementById('divReport');
          elemReport!.style.visibility = "visible";
  
        } else {
          var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
  
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";
  
            var elemReport = document.getElementById('divReport');
            elemReport!.style.visibility = "hidden";

            this.notifier.notify('info', data.mensaje, '');    
        }
      },
        error => {        
  
        });
  
    }
}

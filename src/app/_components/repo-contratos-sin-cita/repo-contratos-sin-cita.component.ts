import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { RepoContratosSinCita } from '../../_models';
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
  selector: 'app-repo-contratos-sin-cita',
  templateUrl: './repo-contratos-sin-cita.component.html',
  styleUrls: ['./repo-contratos-sin-cita.component.scss']
})
export class RepoContratosSinCitaComponent implements OnInit {
  private readonly notifier: NotifierService;
  
 
  hoyDate      : Date = new Date();

  displayedColumns = [
                      'IdConcesionario',  
                      'Concesionario',    
                      'Marca',            
                      'Submarca',         
                      'Modelo',           
                      'VIN',              
                      'Placa',            
                      'Sindicato',        
                      'FechaContrato',    
                      'DiasTranscurridos',
                      'Aviso',            
                      ];
  dataSource!: MatTableDataSource<RepoContratosSinCita>;

    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    reactiveForm!         : FormGroup;
    repoContratosSinCita  : RepoContratosSinCita[] = [];
    matcher               = new MyErrorStateMatcher();
    submitted             = false;
    fileName              : string = "";


  constructor(private formBuilder  : FormBuilder,
    private catalogoService        : CatalogosService,
    private repoService            : ReportesService,
    private alertService           : AlertService,
    notifierService                : NotifierService,
    private excelService           : ExcelService) {
      this.notifier                = notifierService;
     }

  ngOnInit(): void {

    this.getReporteSinCita();
  }


  applyFilter(filterValue: string) {

      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  exportAsXLSX():void {

      this.fileName = "ReporteSinCita" + "-" + moment(this.hoyDate).format('YYYY-MM-DD');
      this.excelService.exportAsExcelFile(this.repoContratosSinCita, this.fileName);
    }

  getReporteSinCita(){
      this.submitted = true;  
   
      this.repoService.getReporteContratosSinCita() 
      .pipe(first())
      .subscribe(data => {
 
        console.log("regresé del reporte")
        console.log(data)
        if (data.estatus && !isEmpty(data.reporte[0])) {
  
          // Assign the data to the data source for the table to render
          this.repoContratosSinCita = data.reporte;
  
          this.dataSource = new MatTableDataSource(this.repoContratosSinCita);
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

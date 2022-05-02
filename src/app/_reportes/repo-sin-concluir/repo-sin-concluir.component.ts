import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, RepoSinConcluir } from '../../_models';
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
  selector: 'app-repo-sin-concluir',
  templateUrl: './repo-sin-concluir.component.html',
  styleUrls: ['./repo-sin-concluir.component.scss']
})

export class RepoSinConcluirComponent implements OnInit {
  private readonly notifier: NotifierService;
  
  hoyDate      : Date = new Date();

  displayedColumns = ['NombreConcesionario', 
                      'PaternoConcesionario', 
                      'MaternoConcesionario', 
                      'Telefono', 
                      'Celular', 
                      'email', 
                      'Calle', 
                      'Exterior', 
                      'Interior', 
                      'Colonia', 
                      'CP', 
                      'Municipio', 
                      'EntidadFederativa', 
                      'Sindicato'  , 
                      'Marca', 
                      'Submarca', 
                      'Modelo', 
                      'NumeroEconomico', 
                      'Placa', 
                      'Estatus', 
                      'Documento', 
                      'NombreArchivo', 
                      ];
  dataSource!: MatTableDataSource<RepoSinConcluir>;

    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    reactiveForm!    : FormGroup;
    repoSinConcluir  : RepoSinConcluir[] = [];
    matcher          = new MyErrorStateMatcher();
    submitted        = false;
    fileName         : string = "";


  constructor(private formBuilder: FormBuilder,
    private catalogoService  : CatalogosService,
    private repoService      : ReportesService,
    private alertService     : AlertService,
    notifierService          : NotifierService,
    private excelService     : ExcelService) { 
      this.notifier          = notifierService;
    }

  ngOnInit(): void {

    this.getReporteSinConcluir();
  }


  applyFilter(filterValue: string) {

      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  exportAsXLSX():void {

      this.fileName = "ReporteSinConcluir" + "-" + moment(this.hoyDate).format('YYYY-MM-DD');
      this.excelService.exportAsExcelFile(this.repoSinConcluir, this.fileName);
    }

  getReporteSinConcluir(){
      this.submitted = true;  
   
      this.repoService.getReporteSinConcluir() 
      .pipe(first())
      .subscribe(data => {
 
        if (data.estatus && !isEmpty(data.reporte[0])) {
  
          // Assign the data to the data source for the table to render
          this.repoSinConcluir = data.reporte;
  
          this.dataSource = new MatTableDataSource(this.repoSinConcluir);
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

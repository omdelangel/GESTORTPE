import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, RepoAhorroPeriodo } from '../../_models';
import { CatalogosService, ReportesService, ExcelService } from '../../_services';
import { first } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import * as moment from 'moment';

/** Error when invalid control is dirty, touched, or submitted. */
export default class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

//Catálogos locales
interface TipoPersona {
  TipoPersona: string;
  viewValue: string;
}

@Component({
  selector: 'app-repo-ahorro-periodo',
  templateUrl: './repo-ahorro-periodo.component.html',
  styleUrls: ['./repo-ahorro-periodo.component.scss']
})
export class RepoAhorroPeriodoComponent implements OnInit {

  displayedColumns = [
                      'NombreConcesionario', 
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
                      'NombreOperador',
                      'PaternoOperador',
                      'MaternoOperador',
                      'FechaInicio',
                      'FechaCorte',
                      'LitrosConsumoMensual',
                      'PorcentajeAhorro',
                      'LitrosConsumidosPeriodo',
                      'LitrosConsumidosAcumuladoGeneral',              
                      ];
  dataSource!: MatTableDataSource<RepoAhorroPeriodo>;

    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    reactiveForm!          : FormGroup;
    sindicatos             : CatalogoSindicatos[] = [];
    repoAhorroPeriodo      : RepoAhorroPeriodo[] = [];
    matcher                = new MyErrorStateMatcher();
    submitted              = false;
    fileName               : string = "";

    tiposPersona: TipoPersona[] = [
      { TipoPersona: 'C', viewValue: 'Concesionario' },
      { TipoPersona: 'P', viewValue: 'Propietario' },
    ];

  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    private repoService: ReportesService,
    private alertService: AlertService,
    private excelService: ExcelService) { }

  ngOnInit(): void {

    //Llena combos
    this.getCatalogoSindicatos();
    
   this.reactiveForm = this.formBuilder.group({
      'TipoPersona'      : ['', Validators.required],
      'sindicato'        : ['', Validators.required],
   });
  }

  get f() { return this.reactiveForm.controls; }

  getCatalogoSindicatos() {
    this.catalogoService.getCatalogoSindicatos()
      .pipe(first())
      .subscribe(data => {
        this.sindicatos = data.sindicatos;
      },
        error => {

        });
  }

    applyFilter(filterValue: string) {

      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    exportAsXLSX():void {

      this.fileName = "ReporteAhorroPeriodo" + "-" + this.f.TipoPersona.value + this.f.sindicato.value;
      this.excelService.exportAsExcelFile(this.repoAhorroPeriodo, this.fileName);
    }

    onSubmit(){
      this.clear();
      this.submitted = true;  
    
    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
     return;
    }
      console.log("Parámetros")
      console.log(this.f.TipoPersona.value)
      console.log(this.f.sindicato.value)


      this.repoService.getReporteAhorroPeriodo(this.f.TipoPersona.value,this.f.sindicato.value) 
      .pipe(first())
      .subscribe(data => {
 
        console.log("regresé del reporte")
        console.log(data)
        if (data.estatus && !isEmpty(data.reporte[0])) {
  
          // Assign the data to the data source for the table to render
          this.repoAhorroPeriodo = data.reporte;
  
          this.dataSource = new MatTableDataSource(this.repoAhorroPeriodo);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
          var elemReport = document.getElementById('divReport');
          elemReport!.style.visibility = "visible";
  
        } else {
          this.warn(data.mensaje);
  
          var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
  
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";
  
            var elemReport = document.getElementById('divReport');
            elemReport!.style.visibility = "hidden";
  
        }
      },
        error => {        
  
        });
  
    }

    error(message: string) {
      this.alertService.error(message, 'error');
    }
  
    info(message: string) {
      this.alertService.info(message, 'info');
    }
  
    warn(message: string) {
      this.alertService.warn(message, 'warn');
    }
  
    clear() {
      this.alertService.clear();
    }
  

}

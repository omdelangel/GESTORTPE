import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, RepoTipoAutoConvertido } from '../../_models';
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
interface Convertidos {
  tipoConvertido : string;
  viewValue      : string;
}

@Component({
  selector: 'app-repo-taxi-van-conv',
  templateUrl: './repo-taxi-van-conv.component.html',
  styleUrls: ['./repo-taxi-van-conv.component.scss']
})
export class RepoTaxiVanConvComponent implements OnInit {
  private readonly notifier: NotifierService;

  displayedColumns = ['NombreConcesionario', 
                      'PaternoConcesionario', 
                      'MaternoConcesionario', 
                      'NombreOperador', 
                      'PaternoOperador', 
                      'MaternoOperador', 
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
                      'ConsumoTotal', 
                      'ConsumoMes', 
                      ];
  dataSource!: MatTableDataSource<RepoTipoAutoConvertido>;

    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    reactiveForm!: FormGroup;
    sindicatos: CatalogoSindicatos[] = [];
    repoTipoAutoConvertido: RepoTipoAutoConvertido[] = [];
    matcher = new MyErrorStateMatcher();
    submitted = false;
    fileName: string = "";

    tipoConvertidos: Convertidos[] = [
      { tipoConvertido: 'A', viewValue: 'Taxis Convertidos' },
      { tipoConvertido: 'V', viewValue: 'Vans Convertidas' },
      { tipoConvertido: 'S', viewValue: 'Suburbano Convertidos' },
    ];

  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    private repoService: ReportesService,
    private alertService: AlertService,
    notifierService: NotifierService,
    private excelService: ExcelService) {
      this.notifier = notifierService;
     }

  ngOnInit(): void {

    //Llena combos
    
   this.reactiveForm = this.formBuilder.group({
      'Convertidos'      : ['', Validators.required],
      'FechaInicio'      : ['', Validators.required],
      'FechaFin'         : ['', Validators.required],
   });
  }

  get f() { return this.reactiveForm.controls; }


    applyFilter(filterValue: string) {

      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    exportAsXLSX():void {

      this.fileName = "ReporteSitActConcesionario" + "-" + this.f.Convertidos.value + this.f.FechaInicio.value;
      this.excelService.exportAsExcelFile(this.repoTipoAutoConvertido, this.fileName);
    }

    onSubmit(){
      this.submitted = true;  
    
    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
     return;
    }
      console.log("Parámetros")
      console.log(this.f.Convertidos.value)
      console.log( this.f.FechaInicio.value)
      console.log(this.f.FechaFin.value)

      this.repoService.getReporteAutosConvertidos(this.f.Convertidos.value, moment(this.f.FechaInicio.value).format('YYYY-MM-DD'), moment(this.f.FechaFin.value).format('YYYY-MM-DD')) 
      .pipe(first())
      .subscribe(data => {
 
        console.log("regresé del reporte")
        console.log(data)
        if (data.estatus && !isEmpty(data.reporte[0])) {
  
          console.log("true")
          // Assign the data to the data source for the table to render
          this.repoTipoAutoConvertido = data.reporte;
  
          this.dataSource = new MatTableDataSource(this.repoTipoAutoConvertido);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
          var elemReport = document.getElementById('divReport');
          elemReport!.style.visibility = "visible";
  
        } else {
          console.log("false")
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

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

  displayedColumns = ['NombreConcesionario ', 
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
    private excelService: ExcelService) { }

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
      this.clear();
      this.submitted = true;  
    
    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
     return;
    }
      console.log("Parámetros")
      console.log(this.f.Convertidos.value)
      console.log( this.f.FechaInicio.value)
      console.log(this.f.FechaFin.value)

      this.repoService.getReporteAutosConvertidos(this.f.Convertidos.value, this.f.FechaInicio.value, this.f.FechaFin.value ) 
      .pipe(first())
      .subscribe(data => {
 
        console.log("regresé del reporte")
        console.log(data)
        if (data.estatus && !isEmpty(data.reporte[0])) {
  
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

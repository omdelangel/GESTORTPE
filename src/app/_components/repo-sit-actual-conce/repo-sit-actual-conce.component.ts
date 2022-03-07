import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, RepoSitActualConcesionario } from '../../_models';
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

@Component({
  selector: 'app-repo-sit-actual-conce',
  templateUrl: './repo-sit-actual-conce.component.html',
  styleUrls: ['./repo-sit-actual-conce.component.scss']
})
export class RepoSitActualConceComponent implements OnInit {

  displayedColumns = ['concesionario', 'marca', 'placa', 'porcAhorroConcesion', 'porcAhorroPropietario', 
  'porcAhorroOperador', 'fechaInicio', 'fechaTermino', 'totalLitrosConsumir', 'totalLitrosMes', 'litrosConsumidos',
  'litrosXConsumir', 'importeBeneficiosConversion', 'totalAhorro', 'totalUtilizadoAhorro', 'totalAhorroRestante'];
  dataSource!: MatTableDataSource<RepoSitActualConcesionario>;

    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    reactiveForm!: FormGroup;
    sindicatos: CatalogoSindicatos[] = [];
    repoSitActualConce: RepoSitActualConcesionario[] = [];
    matcher = new MyErrorStateMatcher();
    submitted = false;
    fileName: string = "";

  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    private repoService: ReportesService,
    private alertService: AlertService,
    private excelService: ExcelService) { }

  ngOnInit(): void {

    //Llena combos
    this.getCatalogoSindicatos();


   this.reactiveForm = this.formBuilder.group({
     'sindicato': ['', Validators.required]
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

      this.fileName = "ReporteSitActConcesionario" + "-" + this.f.sindicato.value;
      this.excelService.exportAsExcelFile(this.repoSitActualConce, this.fileName);
    }

    onSubmit(){
      this.clear();
      this.submitted = true;  
    
    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
     return;
    }

      this.repoService.getReporteSitActualConce(this.f.sindicato.value)
      .pipe(first())
      .subscribe(data => {
 
        if (data.estatus && !isEmpty(data.reporte[0])) {
  
          // Assign the data to the data source for the table to render
          this.repoSitActualConce = data.reporte;
  
          this.dataSource = new MatTableDataSource(this.repoSitActualConce);
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

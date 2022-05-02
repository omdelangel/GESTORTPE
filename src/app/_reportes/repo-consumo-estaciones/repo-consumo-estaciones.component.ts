import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, RepoConsumoEstaciones } from '../../_models';
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
  selector: 'app-repo-consumo-estaciones',
  templateUrl: './repo-consumo-estaciones.component.html',
  styleUrls: ['./repo-consumo-estaciones.component.scss']
})
export class RepoConsumoEstacionesComponent implements OnInit {
  private readonly notifier: NotifierService;

 
  displayedColumns = [
                      'Empresa',
                      'Estacion',
                      'Periodo',
                      'TotalMovimientos',
                      'Litros',
                      'ImporteCobrado',  
                     ];
dataSource!: MatTableDataSource<RepoConsumoEstaciones>;

//@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

reactiveForm!          : FormGroup;
sindicatos             : CatalogoSindicatos[] = [];
repoConsumoEstaciones  : RepoConsumoEstaciones[] = [];
matcher                = new MyErrorStateMatcher();
submitted              = false;
fileName               : string = "";

constructor(
private formBuilder      : FormBuilder,
private catalogoService  : CatalogosService,
private repoService      : ReportesService,
private alertService     : AlertService,
notifierService          : NotifierService,
private excelService     : ExcelService) {
  this.notifier          = notifierService;
 }

ngOnInit(): void {

//Llena combos

this.reactiveForm = this.formBuilder.group({
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

this.fileName = "ReporteConsumoEstaciones" + "-" + this.f.FechaInicio.value;
this.excelService.exportAsExcelFile(this.repoConsumoEstaciones, this.fileName);
}

onSubmit(){
this.submitted = true;  

// stop here if form is invalid
if (this.reactiveForm.invalid) {
return;
}


this.repoService.getReporteConsumoEstaciones(moment(this.f.FechaInicio.value).format('YYYY-MM-DD'), moment(this.f.FechaFin.value).format('YYYY-MM-DD')) 
.pipe(first())
.subscribe(data => {

if (data.estatus && !isEmpty(data.reporte[0])) {

// Assign the data to the data source for the table to render
this.repoConsumoEstaciones = data.reporte;

this.dataSource = new MatTableDataSource(this.repoConsumoEstaciones);
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


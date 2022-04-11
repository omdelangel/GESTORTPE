import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, RepoConsumoItAhorro } from '../../_models';
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
  selector: 'app-repo-consumo-it-incompleto',
  templateUrl: './repo-consumo-it-incompleto.component.html',
  styleUrls: ['./repo-consumo-it-incompleto.component.scss']
})
export class RepoConsumoItIncompletoComponent implements OnInit {
  private readonly notifier: NotifierService;

 
  displayedColumns = [
                      'Concesionario',
                      'Marca',
                      'Modelo',
                      'Serie',
                      'Placa',
                      'Sindicato',
                      'PorcAhorroConcesion',
                      'PorcAhorroPropietario',
                      'FechaInicio',
                      'FechaCorte',
                      'ConsumoMes',
                      'ConsumoTotal',
                      'AhorroUtilizado',
                     ];
dataSource!: MatTableDataSource<RepoConsumoItAhorro>;

//@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

reactiveForm!          : FormGroup;
sindicatos             : CatalogoSindicatos[] = [];
repoConsumoItAhorro    : RepoConsumoItAhorro[] = [];
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
  'Fecha'      : ['', Validators.required],
});
}

get f() { return this.reactiveForm.controls; }


applyFilter(filterValue: string) {

filterValue = filterValue.trim(); // Remove whitespace
filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
this.dataSource.filter = filterValue;
}

exportAsXLSX():void {

this.fileName = "ReporteConsumoItIncompleto" + "-" + this.f.Fecha.value;
this.excelService.exportAsExcelFile(this.repoConsumoItAhorro, this.fileName);
}

onSubmit(){
this.submitted = true;  

// stop here if form is invalid
if (this.reactiveForm.invalid) {
return;
}
console.log("Parámetros")
console.log((this.f.Fecha.value))

this.repoService.getReporteConsumoItIncompleto(moment(this.f.Fecha.value).format('YYYY-MM-DD')) 
.pipe(first())
.subscribe(data => {

console.log("regresé del reporte")
console.log(data)
if (data.estatus && !isEmpty(data.reporte[0])) {

// Assign the data to the data source for the table to render
this.repoConsumoItAhorro = data.reporte;

this.dataSource = new MatTableDataSource(this.repoConsumoItAhorro);
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


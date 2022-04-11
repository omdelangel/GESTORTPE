
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, RepoVigentes } from '../../_models';
import { CatalogosService, ReportesService, ExcelService } from '../../_services';
import { first } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export default class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-vigentes',
  templateUrl: './vigentes.component.html',
  styleUrls: ['./vigentes.component.scss']
})
export class VigentesComponent implements OnInit {
  private readonly notifier: NotifierService;

  displayedColumns = [
                      'Concesionario',
                      'FechaInicio',
                      'FechaTermino',
                      'ConsumoMes',
                      'Periodos',
                      'FechaContrato',
                      'TipoConvertidor',
                      'TipoVehiculo',
                      'Vehiculo',
                      'LitrosConsumidos',
                      'LitroXConsumir',
                      'PorcentajeConsumo',    
];
dataSource!: MatTableDataSource<RepoVigentes>;

//@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

reactiveForm!          : FormGroup;
sindicatos             : CatalogoSindicatos[] = [];
repoVigentes           : RepoVigentes[] = [];
matcher                = new MyErrorStateMatcher();
submitted              = false;
fileName               : string = "";

constructor(
private formBuilder      : FormBuilder,
private catalogoService  : CatalogosService,
private repoService      : ReportesService,
notifierService          : NotifierService,
private excelService     : ExcelService) {
  this.notifier          = notifierService;
 }

ngOnInit(): void {

//Llena combos
this.getCatalogoSindicatos();

this.reactiveForm = this.formBuilder.group({
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

this.fileName = "ReporteVigentes" + "-" + this.f.sindicato.value;
this.excelService.exportAsExcelFile(this.repoVigentes, this.fileName);
}

onSubmit(){
this.submitted = true;  

// stop here if form is invalid
if (this.reactiveForm.invalid) {
return;
}

this.repoService.getRegistrosVigentes(this.f.sindicato.value) 
.pipe(first())
.subscribe(data => {

  console.log("vigentes");
  console.log(data);

if (data.estatus && !isEmpty(data.hFormalizadosLista[0])) {

// Assign the data to the data source for the table to render
this.repoVigentes = data.hFormalizadosLista;

this.dataSource = new MatTableDataSource(this.repoVigentes);
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;

var elemDiv = document.getElementById('divTitle');
elemDiv!.style.visibility = "visible";

var elemTable = document.getElementById('htmlData');
elemTable!.style.visibility = "visible";

//var elemReport = document.getElementById('divReport');
//elemReport!.style.visibility = "visible";

} else {
var elemDiv = document.getElementById('divTitle');
elemDiv!.style.visibility = "hidden";

var elemTable = document.getElementById('htmlData');
elemTable!.style.visibility = "hidden";

//var elemReport = document.getElementById('divReport');
//elemReport!.style.visibility = "hidden";

this.notifier.notify('info', data.mensaje, '');    

}
},
error => {        

});

}
}



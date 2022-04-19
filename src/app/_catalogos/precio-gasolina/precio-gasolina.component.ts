import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Entidades, PreciosGasolina } from 'src/app/_models';
import { CatalogosService } from 'src/app/_services';
import { NotifierService } from 'angular-notifier';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AltaPreciosGasolinaComponent } from '../alta-precios-gasolina';

/** Error when invalid control is dirty, touched, or submitted. */
export default class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-precio-gasolina',
  templateUrl: './precio-gasolina.component.html',
  styleUrls: ['./precio-gasolina.component.scss']
})
export class PrecioGasolinaComponent implements OnInit {
  private readonly notifier: NotifierService;

  displayedColumns = ['FechaAlta', 'FechaDesde', 'FechaHasta', 'NombreE', 'NombreM', 'PrecioLtr'];
  dataSource!: MatTableDataSource<PreciosGasolina>;

    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    reactiveForm!: FormGroup;
    entidades: Entidades[] = [];
    preciosGasolina: PreciosGasolina[] = [];
    matcher = new MyErrorStateMatcher();
    submitted = false;
    idEntidad: string = "";
    nombreEntidad: string = "";


  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    notifierService: NotifierService,
    public dialog: MatDialog,) { 

      this.notifier = notifierService; 
    }

  ngOnInit(): void {

    //Llena combos
    this.getCatalogoEntidades();

   this.reactiveForm = this.formBuilder.group({
     'FechaDesde': ['', Validators.required],
     'FechaHasta': ['', Validators.required],
     'IdEntidadFederal': ['', Validators.required],
   });
  }

  get f() { return this.reactiveForm.controls; }

  getCatalogoEntidades() {
    this.catalogoService.getCatalogoEntidades()
      .pipe(first())
      .subscribe(data => {
        this.entidades = data.entidades;
      },
        error => {

        });
  }

    applyFilter(filterValue: string) {

      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }


    onSubmit(){
      this.submitted = true;  
    
    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
     return;
    }

      this.catalogoService.getPreciosGasolina(moment(this.f.FechaDesde.value).format('YYYY/MM/DD') , moment(this.f.FechaHasta.value).format('YYYY/MM/DD'), this.idEntidad)
      .pipe(first())
      .subscribe(data => {

        if (data.estatus && data.hGasolinaLista != "") {
  
          this.notifier.notify('success', data.mensaje);
          // Assign the data to the data source for the table to render
          this.preciosGasolina = data.hGasolinaLista;
  
          this.dataSource = new MatTableDataSource(this.preciosGasolina);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
        } else {

          this.notifier.notify('warning', data.mensaje);
  
          var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
  
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";
  
        }
      },
        error => {      
          this.notifier.notify('error', error);  
  
        });
  
    }

    onSelection(value: any){

      this.idEntidad = value[0];
      this.nombreEntidad = value[1];

    }

     //Abre modal para Alta de precios
     openDialog(): void {

      const dialogRef = this.dialog.open(AltaPreciosGasolinaComponent, {
        disableClose: true,
        data: {idEntidad: this.idEntidad, nombreE: this.nombreEntidad},
        width:'50%'

      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.onSubmit();
      });
    }

}

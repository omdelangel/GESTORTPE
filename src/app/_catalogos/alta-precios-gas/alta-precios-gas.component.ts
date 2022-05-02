import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogosService } from '../../_services';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { CatalogoRegiones, Entidades, Municipios, PreciosGas } from 'src/app/_models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/*
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {MatDatepicker} from '@angular/material/datepicker';
import {default as _rollupMoment, Moment} from 'moment';  

const moment = _rollupMoment || _moment;
*/


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-alta-precios-gas',
  templateUrl: './alta-precios-gas.component.html',
  styleUrls: ['./alta-precios-gas.component.scss']
})

export class AltaPreciosGasComponent implements OnInit {
  private readonly notifier: NotifierService;
  matcher              = new MyErrorStateMatcher();
  regiones             :CatalogoRegiones[] = [];
  entidades            :Entidades[] = [];
  municipios           :Municipios[] = [];
  preciosGas           :PreciosGas;
  submitted            = false;
  IdHistorico          = 0;
  espacios             = "";
  hoyDate              : Date = new Date();
  fechaWork            : Date = new Date();
  dias                 = 6; 



  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm            !:FormGroup;
  idEntidadValue          :string = "";
  nombreEValue            :string = "";

  constructor(
    private formBuilder          :FormBuilder,
    private catalogoService      :CatalogosService,
    notifierService              :NotifierService,
    public dialogRef             :MatDialogRef<AltaPreciosGasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier               = notifierService;
      this.idEntidadValue         = data.idEntidad;
      this.nombreEValue           = data.nombreE;
     }

  ngOnInit(): void {
    this.getCatalogoEntidades();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Entidad'              : ['', Validators.required],
      'Municipio'            : ['', Validators.required],
      'FechaInicio'          : ['', Validators.required],
//      'FechaTermino'         : ['', Validators.required],
      'PrecioKg'             : ['', Validators.required],
      'PrecioLtr'            : ['', Validators.required],
    });     
  }

  get f() { return this.reactiveForm.controls; }


  //Llena catálogo de Entidades
  getCatalogoEntidades() {
    this.catalogoService.getCatalogoEntidades()
      .pipe(first())
      .subscribe(data => {
        this.entidades       = data.entidades;

      },
        error => {
        });
    }      

  //Llena catálogo de Municipio
  getCatalogoMunicipios(event: any) {

    this.catalogoService.getCatalogoMunicipios(event.value)
      .pipe(first())
      .subscribe(data => {
        this.municipios       = data.MunicipiossLista;

      },
        error => {
        });
    }  

  //Acepta sólo el ingreso de números
  keyPress(event: any) {
    const pattern = /[0-9\+\-\. ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  //Acepta sólo el ingreso de números
  ValidaDia(event: any) {
    const numeroDia = new Date(this.f.FechaInicio.value).getDay();
    if (numeroDia != 0){
      this.notifier.notify('warning', "Debe seleccionar Domingo ", '');   
      this.f.FechaInicio.setValue(this.espacios);                
    }else{
      this.fechaWork = moment(this.f.FechaInicio.value,"DD/MM/YYYY").toDate();
      this.fechaWork.setDate(this.fechaWork.getDate() + this.dias);
    }
  
  }    


  //Registra el Usuario
  guardarPreciosGas() {
    
    //this.clear();
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.reactiveForm.invalid) {
       return;
     }
 
     this.preciosGas   = {
      IdHistoricoGas          : this.IdHistorico                                       ,
      FechaAlta               :moment(this.hoyDate).format('YYYY-MM-DD')               ,
      FechaDesde              :moment(this.f.FechaInicio.value).format('YYYY-MM-DD')   ,
//      FechaHasta              :moment(this.f.FechaTermino.value).format('YYYY-MM-DD')  ,
      FechaHasta              :moment(this.fechaWork).format('YYYY-MM-DD')             ,
      IdEntidadFederal        :this.f.Entidad.value                                    ,
      IdMunicipio             :this.f.Municipio.value                                  ,
      PrecioKg                :this.f.PrecioKg.value                                   ,
      PrecioLtr               :this.f.PrecioLtr.value                                  ,
      NombreE                 :this.espacios                                           ,  
      NombreM                 :this.espacios                                           , 
     }
 
     this.catalogoService.postRegistraPreciosGas(this.preciosGas)
       .pipe(first())
       .subscribe(
         data => {
           if (data.estatus) {
             this.notifier.notify('success', data.mensaje, '');    
             this.dialogRef.close();
           } else {
             //this.warn(data.mensaje);
             this.notifier.notify('warning', data.mensaje, '');
           }
         },
         error => {
           //this.error(error);
           this.notifier.notify('error', error, '');
         });
   }
 
    
  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)


    } else {
      return
    }
  }


  editar(e: any){
  }

    //Cierra la pantalla
  onNoClick(): void {
    this.dialogRef.close();
  }

}

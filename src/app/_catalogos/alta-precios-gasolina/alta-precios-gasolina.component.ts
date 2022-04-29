import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogosService } from '../../_services';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { CatalogoRegiones, Entidades, Municipios, PreciosGasolina } from 'src/app/_models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-alta-precios-gasolina',
  templateUrl: './alta-precios-gasolina.component.html',
  styleUrls: ['./alta-precios-gasolina.component.scss']
})
export class AltaPreciosGasolinaComponent implements OnInit {
  private readonly notifier: NotifierService;
  matcher              = new MyErrorStateMatcher();
  regiones             :CatalogoRegiones[] = [];
  entidades            :Entidades[] = [];
  municipios           :Municipios[] = [];
  preciosGasolina      :PreciosGasolina;
  submitted            = false;
  IdHistorico          = 0;
  espacios             = "";
  hoyDate              : Date = new Date();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm            !:FormGroup;
  idEntidadValue          :string = "";
  nombreEValue            :string = "";

  constructor(
    private formBuilder          :FormBuilder,
    private catalogoService      :CatalogosService,
    notifierService              :NotifierService,
    public dialogRef             :MatDialogRef<AltaPreciosGasolinaComponent>,
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

  //Registra el Usuario
  guardarPreciosGas() {
    
    //this.clear();
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.reactiveForm.invalid) {
       return;
     }
 
     this.preciosGasolina   = {
      IdHistoricoGasolina     : this.IdHistorico                                       ,
      FechaAlta               :moment(this.hoyDate).format('YYYY-MM-DD')               ,
      FechaDesde              :moment(this.f.FechaInicio.value).format('YYYY-MM-DD')   ,
      FechaHasta              :moment(this.f.FechaInicio.value).format('YYYY-MM-DD')  ,
      IdEntidadFederal        :this.f.Entidad.value                                    ,
      IdMunicipio             :this.f.Municipio.value                                  ,
      PrecioLtr               :this.f.PrecioLtr.value                                  ,
      NombreE                 :this.espacios                                           ,  
      NombreM                 :this.espacios                                           , 
     }

 
     this.catalogoService.postRegistraPreciosGasolina(this.preciosGasolina)
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


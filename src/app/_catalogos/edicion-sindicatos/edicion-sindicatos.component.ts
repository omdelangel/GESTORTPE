import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { CatalogosService } from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogoRegiones, CatalogoTipoConvertidor,CatalogoSindicato} from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

//Catálogos locales
interface Estatus {
  Estatus: string;
  viewValue: string;
}

@Component({
  selector: 'app-edicion-sindicatos',
  templateUrl: './edicion-sindicatos.component.html',
  styleUrls: ['./edicion-sindicatos.component.scss']
})
export class EdicionSindicatosComponent implements OnInit {
  private readonly notifier: NotifierService;
  frmEditSind          !:FormGroup;
  submitted            = false;
  catalogoSindicato    :CatalogoSindicato;
  regiones             :CatalogoRegiones[] = [];
  TipoConvertidor      :CatalogoTipoConvertidor[] = [];  
  matcher              = new MyErrorStateMatcher();

  IdSindicato            :number;
  Nombre                 :string;
  Seccion                :string;
  Responsable            :string;
  Direccion              :string;
  IdRegion               :number;
  IdTipoConvertidor      :number;
  Estatus                :string;


  estatus: Estatus[] = [
    { Estatus: 'A', viewValue: 'Activo' },
    { Estatus: 'I', viewValue: 'Inactivo' },
  ];
 

  constructor(
    private formBuilder       : FormBuilder,
    private catalogoService   : CatalogosService,
    notifierService           : NotifierService,
    public dialogRef          : MatDialogRef<EdicionSindicatosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    { 
        console.log("data parametros Sindicatos")
        console.log(data)
  
        this.IdSindicato             = data.IdSindicato            ;
        this.Nombre                  = data.Nombre                 ;
        this.Seccion                 = data.Seccion                ;
        this.Responsable             = data.Responsable            ;
        this.Direccion               = data.Direccion              ;
        this.IdRegion                = data.IdRegion               ;
        this.IdTipoConvertidor       = data.IdTipoConvertidor      ;
        this.Estatus                 = data.Estatus                ;
      
        this.notifier = notifierService;   

        this.getCatalogoRegion();
        this.getCatalogoTipoConv();    
    }

  ngOnInit(): void {
    //Validación de campos en pantalla

    this.frmEditSind = this.formBuilder.group({
      'IdSindicato'            : [({ value: "", disabled: true }), Validators.required],
      'Nombre'                 : ['', Validators.required],
      'Seccion'                : ['', Validators.required],
      'Responsable'            : ['', Validators.required],
      'Direccion'              : ['', Validators.required],
      'Region'                 : ['', Validators.required],
      'TipoConvertidor'        : ['', Validators.required],
      'Estatus'                : ['', Validators.required],
    }); 
    this.llenaPantalla();
  }

 
  get f() { return this.frmEditSind.controls; }

  //Consulta los datos del concesionario
  llenaPantalla() {

    this.f.IdSindicato.setValue(this.IdSindicato);
    this.f.Nombre.setValue(this.Nombre);
    this.f.Seccion.setValue(this.Seccion);
    this.f.Responsable.setValue(this.Responsable);
    this.f.Direccion.setValue(this.Direccion);
    this.f.Region.setValue(this.IdRegion);
    this.f.TipoConvertidor.setValue(this.IdTipoConvertidor);
    this.f.Estatus.setValue(this.Estatus);
  }


  onSubmit() {
    if (this.frmEditSind.valid) {

    } else {
      return
    }
  }


  //Acepta sólo el ingreso de números
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  //Llena catálogo de Regiones
  getCatalogoRegion() {
  this.catalogoService.getCatalogoRegiones()
    .pipe(first())
    .subscribe(data => {
      this.regiones       = data.regionesLista;
      console.log(this.regiones)
    },
      error => {
      });
  }  
     
  //Llena catálogo de Tipo Conv
  getCatalogoTipoConv() {
  this.catalogoService.getCatalogoTipoConv()
    .pipe(first())
    .subscribe(data => {
      this.TipoConvertidor   = data.convertidoresLista;
    },
      error => {
      });
  }    
  

  guardarSindicato() {
     
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.frmEditSind.invalid) {
       return;
     }
 
     this.catalogoSindicato = {
      IdSindicato           : this.IdSindicato                   ,
      Nombre                : this.f.Nombre.value                ,
      Seccion               : this.f.Seccion.value               ,
      Responsable           : this.f.Responsable.value           ,
      Direccion             : this.f.Direccion.value             ,
      IdRegion              : this.f.Region.value                ,
      IdTipoConvertidor     : this.f.TipoConvertidor.value       ,
      Estatus               : this.f.Estatus.value               ,
     }
 
     this.catalogoService.postModificaSindicato(this.catalogoSindicato)
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
 

  onNoClick(): void {
    this.dialogRef.close();
  }

}


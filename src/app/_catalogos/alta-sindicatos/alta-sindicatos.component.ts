import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { CatalogosService } from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogoRegiones, CatalogoTipoConvertidor,CatalogoAsignacionSindicato, CatalogoTipoAsignacion} from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-alta-sindicatos',
  templateUrl: './alta-sindicatos.component.html',
  styleUrls: ['./alta-sindicatos.component.scss']
})
export class AltaSindicatosComponent implements OnInit {
  private readonly notifier: NotifierService;
  IdSindicato                    :number=0;
  porcWork                       :number=0;
  Estatus                        :string='A';
  frmAltaSind                    !:FormGroup;
  submitted                      = false;
  catalogoAsignacionSindicato    :CatalogoAsignacionSindicato;
  regiones                       :CatalogoRegiones[] = [];
  TipoConvertidor                :CatalogoTipoConvertidor[] = [];
  TipoAsignacion                 :CatalogoTipoAsignacion[] = []; 
  matcher                        = new MyErrorStateMatcher();
  
  

  constructor(
    private formBuilder      :FormBuilder,
    private catalogoService  :CatalogosService,
    notifierService          : NotifierService,

    public dialogRef: MatDialogRef<AltaSindicatosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {
      this.notifier = notifierService;       
  }

  ngOnInit(): void {

    this.getCatalogoRegion();
    this.getCatalogoTipoConv();
    this.getCatalogoTipoAsignacion();
    //Validación de campos en pantalla
    this.frmAltaSind = this.formBuilder.group({
      'Nombre'                 : ['', Validators.required],
      'Seccion'                : ['', Validators.required],
      'Responsable'            : ['', Validators.required],
      'Direccion'              : ['', Validators.required],
      'Region'                 : ['', Validators.required],
      'TipoConvertidor'        : ['', Validators.required],
      'TipoAsignacionA'        : [({ value: "", disabled: true }), Validators.required],      
      'PorcAhorroConcesionA'   : ['', Validators.required],
      'PorcAhorroOperadorA'    : ['', Validators.required],
      'PorcAhorroPropietarioA' : ['', Validators.required],
      'TipoAsignacionB'        : [({ value: "", disabled: true }), Validators.required],      
      'PorcAhorroConcesionB'   : ['', Validators.required],
      'PorcAhorroOperadorB'    : ['', Validators.required],
      'PorcAhorroPropietarioB' : ['', Validators.required],
      'TipoAsignacionC'        : [({ value: "", disabled: true }), Validators.required],      
      'PorcAhorroConcesionC'   : ['', Validators.required],
      'PorcAhorroOperadorC'    : ['', Validators.required],
      'PorcAhorroPropietarioC' : ['', Validators.required],

    }); 
  }

  get f() { return this.frmAltaSind.controls; }

  onSubmit() {
    if (this.frmAltaSind.valid) {
    } else {
      return
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

  //Llena catálogo de Tipo Asignación
  getCatalogoTipoAsignacion() {
    this.catalogoService.getCatalogoTipoAsignacion()
      .pipe(first())
      .subscribe(data => {
        console.log("Tipos de Asignación")
        console.log(data)
        this.TipoAsignacion   = data.TiposAsignacionsLista;
        this.f.TipoAsignacionA.setValue(this.TipoAsignacion[0].Nombre);                
        this.f.TipoAsignacionB.setValue(this.TipoAsignacion[1].Nombre);                
        this.f.TipoAsignacionC.setValue(this.TipoAsignacion[2].Nombre);                
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
  guardarAsignacionSindicato() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaSind.invalid) {
      return;
    }

    this.catalogoAsignacionSindicato   = {
      IdSindicato           					: this.IdSindicato                    				,
      Nombre                					: this.f.Nombre.value                					,
      Seccion               					: this.f.Seccion.value	              				,
      Responsable           					: this.f.Responsable.value          					,
      Direccion             					: this.f.Direccion.value            					,
      IdRegion              					: this.f.Region.value                					,
      IdTipoConvertidor     					: this.f.TipoConvertidor.value			      		,
      Estatus               					: this.Estatus                      					,
      IdTipoAsignacionA     					: this.TipoAsignacion[0].IdTipoAsignacion 	  ,
      PorcAhorroConcesionA  					: Number(this.f.PorcAhorroConcesionA.value)  	,
      PorcAhorroOperadorA   					: Number(this.f.PorcAhorroOperadorA.value)		,
      PorcAhorroPropietarioA					: Number(this.f.PorcAhorroPropietarioA.value)	,
      IdTipoAsignacionB     					: this.TipoAsignacion[1].IdTipoAsignacion		  ,
      PorcAhorroConcesionB  					: Number(this.f.PorcAhorroConcesionB.value)  	,
      PorcAhorroOperadorB   					: Number(this.f.PorcAhorroOperadorB.value)   	,
      PorcAhorroPropietarioB					: Number(this.f.PorcAhorroPropietarioB.value)	,
      IdTipoAsignacionC     					: this.TipoAsignacion[2].IdTipoAsignacion    	,
      PorcAhorroConcesionC  					: Number(this.f.PorcAhorroConcesionC.value)  	,
      PorcAhorroOperadorC   					: Number(this.f.PorcAhorroOperadorC.value)   	,
      PorcAhorroPropietarioC					: Number(this.f.PorcAhorroPropietarioC.value)	,
    }

    this.catalogoAsignacionSindicato.PorcAhorroConcesionA      = this.catalogoAsignacionSindicato.PorcAhorroConcesionA / 10000;
    this.catalogoAsignacionSindicato.PorcAhorroOperadorA       = this.catalogoAsignacionSindicato.PorcAhorroOperadorA / 10000;
    this.catalogoAsignacionSindicato.PorcAhorroPropietarioA    = this.catalogoAsignacionSindicato.PorcAhorroPropietarioA / 10000;

    this.catalogoAsignacionSindicato.PorcAhorroConcesionB      = this.catalogoAsignacionSindicato.PorcAhorroConcesionB/10000;
    this.catalogoAsignacionSindicato.PorcAhorroOperadorB       = this.catalogoAsignacionSindicato.PorcAhorroOperadorB/10000;
    this.catalogoAsignacionSindicato.PorcAhorroPropietarioB    = this.catalogoAsignacionSindicato.PorcAhorroPropietarioB/10000;

    this.catalogoAsignacionSindicato.PorcAhorroConcesionC      = this.catalogoAsignacionSindicato.PorcAhorroConcesionC/10000;
    this.catalogoAsignacionSindicato.PorcAhorroOperadorC       = this.catalogoAsignacionSindicato.PorcAhorroOperadorC/10000;
    this.catalogoAsignacionSindicato.PorcAhorroPropietarioC    = this.catalogoAsignacionSindicato.PorcAhorroPropietarioC/10000;

    this.catalogoService.postRegistraAsignacionSindicato(this.catalogoAsignacionSindicato)
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


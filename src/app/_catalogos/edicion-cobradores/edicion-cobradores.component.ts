import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoEstaciones, CatalogoCobradores,  CP, Asentamientos, Identificaciones } from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
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

interface Genero {
  Genero: string;
  viewValue: string;
}  

interface TipoPersona {
TipoPersona: string;
viewValue: string;
}


@Component({
  selector: 'app-edicion-cobradores',
  templateUrl: './edicion-cobradores.component.html',
  styleUrls: ['./edicion-cobradores.component.scss']
})
export class EdicionCobradoresComponent implements OnInit {
  IdEmpleado                    :number; 
  Nombre                        :string; 
  Paterno                       :string; 
  Materno                       :string; 
  RFC                           :string; 
  CURP                          :string; 
  INE                           :string; 
  FechaNacimiento               :string;   
  TipoPersona                   :string; 
  TPNombre				          	  :string; 
  Genero                        :string; 
  GNombre		  			        	  :string; 
  Domicilio                     :string; 
  Colonia		        		     	  :string; 
  IdColonia                     :string; 
  CP                            :string; 
  EFNombre					            :string; 
  MNombre	          					  :string; 
  Telefono                      :string; 
  email                         :string; 
  IdEstacion                    :number; 
  ENombre						            :string; 
//  Estatus                       :string; 
  IdUsuario                     :string; 
  contrasenia                   :string;






  private readonly notifier: NotifierService;
  hoyDate : Date = new Date();
  cobradores    :CatalogoCobradores;
  todayNumber: number = Date.now();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  espacios             :string = "";
  Estatus    :string='A';
  Intentos   :number=0;
  Bloqueado  :boolean=false; 
  frmEditUsr!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  idConcesionario: number = 0;
  cp: string = "";
  asentamientos!: CP;
  municipio: string = "";
  entidadFederativa: string = "";
  colonias: Asentamientos[] = [];
  identificaciones: Identificaciones[] = [];
  estaciones           :CatalogoEstaciones[] = [];
  fechaNacimiento: string = "";
  asigna: boolean = false;
  nombreConcesionario: string = "";
  hide = false;

  estatus: Estatus[] = [
    { Estatus: 'A', viewValue: 'Activo' },
    { Estatus: 'I', viewValue: 'Inactivo' },
  ];

  generos: Genero[] = [
    { Genero: 'M', viewValue: 'Masculino' },
    { Genero: 'F', viewValue: 'Femenino' }
  ];

  tiposPersona: TipoPersona[] = [
    { TipoPersona: 'F', viewValue: 'Física' },
    { TipoPersona: 'M', viewValue: 'Moral' },
  ];
 

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<EdicionCobradoresComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    { 
      this.IdEmpleado                = data.IdEmpleado          ;
      this.Nombre                    = data.Nombre              ;
      this.Paterno                   = data.Paterno             ;
      this.Materno                   = data.Materno             ;
      this.RFC                       = data.RFC                 ;
      this.CURP                      = data.CURP                ;
      this.INE                       = data.INE                 ;
      this.FechaNacimiento           = data.FechaNacimiento     ;
      this.TipoPersona               = data.TipoPersona         ;
      this.TPNombre				           = data.TPNombre				    ;
      this.Genero                    = data.Genero              ;
      this.GNombre		  		         = data.GNombre		  		    ;
      this.Domicilio                 = data.Domicilio           ;
      this.Colonia                   = data.Colonia             ;
      this.IdColonia                 = data.IdColonia           ;
      this.CP                        = data.CP                  ;
      this.EFNombre				           = data.EFNombre				    ;
      this.MNombre					         = data.MNombre					    ;
      this.Telefono                  = data.Telefono            ;
      this.email                     = data.email               ;
      this.IdEstacion                = data.IdEstacion          ;
      this.ENombre					         = data.ENombre					    ;
      this.Estatus                   = data.Estatus             ;
      this.IdUsuario                 = data.IdUsuario           ;
      this.contrasenia               = data.contrasenia         ;
           
      this.notifier                  = notifierService;   
    }

  ngOnInit(): void {
    //this.clear();

    this.getCatalogoEstaciones();

    //Validación de campos en pantalla
    this.frmEditUsr = this.formBuilder.group({
      'Nombre'              :[{ value: "", disabled: true }],
      'Paterno'             :[{ value: "", disabled: true }],
      'Materno'             :[{ value: "", disabled: true }],
      'RFC'                 :[{ value: "", disabled: true }],
      'CURP'                :[{ value: "", disabled: true }],
      'INE'                 :['', Validators.required],
      'FechaNacimiento'     :[{ value: "", disabled: true }],
      'TipoPersona'         :['', Validators.required],
      'Genero'              :[{ value: "", disabled: true }],
      'Domicilio'           :['', Validators.required],
      'IdColonia'           :['', Validators.required],
      'cp'                  :['', Validators.required],
      'IdEntidad'           :[{ value: "", disabled: true }],
      'IdMunicipio'         :[{ value: "", disabled: true }],  
      'Telefono'            :['', Validators.required],
      'email'               :[({ value: "", disabled: true }), Validators.required],
      'IdEstacion'          :['', Validators.required],
      'Estatus'             :['', Validators.required],
    }); 
    this.llenaPantalla();
  }

 
  get f() { return this.frmEditUsr.controls; }

  //Consulta los datos del concesionario
  llenaPantalla() {
    this.f.Nombre.setValue(this.Nombre)                     ;
    this.f.Paterno.setValue(this.Paterno)                   ;
    this.f.Materno.setValue(this.Materno)                   ;
    this.f.RFC.setValue(this.RFC)                           ;
    this.f.CURP.setValue(this.CURP)                         ;
    this.f.INE.setValue(this.INE)                           ;
    this.f.FechaNacimiento.setValue(this.FechaNacimiento)   ;
    this.f.TipoPersona.setValue(this.TipoPersona)           ;
    this.f.Genero.setValue(this.Genero)                     ;
    this.f.Domicilio.setValue(this.Domicilio)               ;
    this.f.cp.setValue(this.CP)                             ;
    this.changeCP();
    this.f.IdColonia.setValue(this.IdColonia)               ;
    this.f.IdEntidad.setValue(this.EFNombre)                ;
    this.f.IdMunicipio.setValue(this.MNombre)               ;
    this.f.Telefono.setValue(this.Telefono)                 ;
    this.f.email.setValue(this.email)                       ;
    this.f.IdEstacion.setValue(this.IdEstacion)             ;
    this.f.Estatus.setValue(this.Estatus)                   ;                  
  }


  onSubmit() {
    if (this.frmEditUsr.valid) {

    } else {
      return
    }
  }
   //Llena catálogo de Estaciones
   getCatalogoEstaciones() {
    this.catalogoService.getCatalogoEstaciones()
      .pipe(first())
      .subscribe(data => {
 
        this.estaciones   = data.estacionesLista;

      },
        error => {
        });
  } 

    //Obtiene los datos de Municipio, Entidad y Colonia
    changeCP(): void {
      //this.clear();
  
      this.cp = this.f.cp.value;
  
      this.catalogoService.getConsultaCP(this.cp)
        .pipe(first())
        .subscribe(
          data => {
    
            if (data.estatus && data.cp != "") {
              this.asentamientos = data.cp;
              this.frmEditUsr.patchValue({
                IdMunicipio    : this.asentamientos.Municipio,
                IdEntidad      : this.asentamientos.EntidadFederativa
              });
              this.colonias = this.asentamientos.asentamientos;
            } else {
  
              this.frmEditUsr.patchValue({
                IdMunicipio: "",
                IdEntidad: ""
              });
              this.colonias = [];
            }
          },
          error => {
            //this.error(error);
            this.notifier.notify('error', error, '');
          });
    }

  //Valida que las contraseñas sean Iguales 
  validarContrasenia(e: any){
    if (e.target.value != this.f.Contrasenia.value){

      this.notifier.notify('error', "Las contraseñas deben ser iguales", '');
    }
  }
      
  //Evento para ocultar y mostrar la pestaña de propietario
  onSelectionAsignacion(value: any) {
    if (value == 6 || value == 3) {
      this.asigna = true;
      this.concesionarioService.sendView(true);
    } else {
      this.asigna = false;
      this.concesionarioService.sendView(false);
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


  guardarCobrador() {

    console.log("Entre a guardar")
     
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.frmEditUsr.invalid) {
       return;
     }
 
     console.log("PAse la validación")

     this.cobradores = {
      IdEmpleado              :this.IdEmpleado               ,
      Nombre                  :this.Nombre                   ,
      Paterno                 :this.Paterno                  ,
      Materno                 :this.Materno                  ,
      RFC                     :this.RFC                      ,
      CURP                    :this.CURP                     ,
      INE                     :this.f.INE.value              ,
      FechaNacimiento         :moment(this.FechaNacimiento).format('YYYY-MM-DD'),
      TipoPersona             :this.f.TipoPersona.value      ,
      TPNombre				        :this.espacios                 ,
      Genero                  :this.Genero                   ,
      GNombre		  		        :this.espacios                 ,
      Domicilio               :this.f.Domicilio.value        ,
      Colonia                 :this.f.IdColonia.value        ,
      IdColonia               :this.f.IdColonia.value        ,
      CP                      :this.f.cp.value               ,
      EFNombre				        :this.espacios                 ,
      MNombre					        :this.espacios                 ,
      Telefono                :this.f.Telefono.value         ,
      email                   :this.email                    ,
      IdEstacion              :this.f.IdEstacion.value       ,
      ENombre					        :this.espacios                 ,
      Estatus                 :this.f.Estatus.value          ,
      IdUsuario               :this.espacios                 ,
      contrasenia             :this.espacios                 ,
      Foto                    :this.espacios                 ,
     }
     console.log("Modificación cobradores")
     console.log(this.cobradores)

     this.catalogoService.postModificaCobradores(this.cobradores)
       .pipe(first())
       .subscribe(
         data => {
          console.log("Modificación cobradores regreso")
          console.log(this.data)          
                 
           if (data.estatus) {
            console.log("Modificación cobradores regreso1")
            console.log(this.data)          
  
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



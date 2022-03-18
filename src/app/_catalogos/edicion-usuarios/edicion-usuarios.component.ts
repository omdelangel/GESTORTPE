import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoPerfiles, UsuariosAltaEdicion,  CP, Asentamientos, Identificaciones } from '../../_models';
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

@Component({
  selector: 'app-edicion-usuarios',
  templateUrl: './edicion-usuarios.component.html',
  styleUrls: ['./edicion-usuarios.component.scss']
})


export class EdicionUsuariosComponent implements OnInit {
  private readonly notifier: NotifierService;
  hoyDate : Date = new Date();
  usuario    :UsuariosAltaEdicion;
  todayNumber: number = Date.now();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  IdUsuario        :string;
  Nombre           :string;
  Contrasenia      :string;
  IdEmpleado       :number;
  IdPerfil         :number;
  FechaRegistro    :string;
//  Estatus          :string;
  email            :string;
 // Bloqueado        :boolean;
 // Intentos         :number;
  UltimaTransaccion:string;
  Estatus    :string='A';
  Intentos   :number=0;
  Bloqueado  :boolean=false; 
  frmEditUsr!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  perfiles: CatalogoPerfiles[] = [];
  idConcesionario: number = 0;
  cp: string = "";
  asentamientos!: CP;
  municipio: string = "";
  entidadFederativa: string = "";
  colonias: Asentamientos[] = [];
  identificaciones: Identificaciones[] = [];
  fechaNacimiento: string = "";
  asigna: boolean = false;
  nombreConcesionario: string = "";
  hide = false;
 

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<EdicionUsuariosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    { 
      console.log("data parametros")
      console.log(data)
      console.log(data.IdUsuario)
      console.log(this.IdUsuario)
      this.IdUsuario           = data.IdUsuario        ;
      this.Nombre              = data.Nombre           ;
      this.Contrasenia         = data.Contrasenia      ;
      this.IdEmpleado          = data.IdEmpleado       ;
      this.IdPerfil            = data.IdPerfil         ;
      this.FechaRegistro       = data.FechaRegistro    ;
      this.Estatus             = data.Estatus          ;
      this.email               = data.email            ;
      this.Bloqueado           = data.Bloqueado        ;
      this.Intentos            = data.Intentos         ;
      this.UltimaTransaccion   = data.UltimaTransaccion;
     
      this.notifier = notifierService;   
      this.getCatalogoPerfiles();    
      //this.llenaPantalla();
    }

  ngOnInit(): void {

    //this.clear();
    //Validación de campos en pantalla
    this.frmEditUsr = this.formBuilder.group({
      'IdUsuario'       : ['', Validators.required],
      'Nombre'          : ['', Validators.required],
      'IdPerfil'        : ['', Validators.required],
      'Contrasenia'     : ['', Validators.required], 
      'RepContrasenia'  : ['', Validators.required], 
      'email'           : ['', Validators.required]
    }); 
    //this.llenaPantalla();
  }

 
  get f() { return this.frmEditUsr.controls; }

  //Consulta los datos del concesionario
  llenaPantalla() {

    console.log("Datos en llena pantalla")
    console.log(this.IdUsuario)
    console.log(this.Nombre)
    console.log(this.Contrasenia)
    console.log(this.IdPerfil)
    console.log(this.email)

    this.f.IdUsuario.setValue(this.IdUsuario);                
    this.f.Nombre.setValue(this.Nombre);                
    this.f.Contrasenia.setValue(this.Contrasenia);                
    this.f.RepContrasenia.setValue(this.Contrasenia);                
    this.f.IdPerfil.setValue(this.IdPerfil);                
    this.f.email.setValue(this.email);                
  }


  onSubmit() {
    if (this.frmEditUsr.valid) {

    } else {
      return
    }
  }

     //Llena catálogo de Perfiles
   getCatalogoPerfiles() {
    this.catalogoService.getCatalogoPerfiles()
      .pipe(first())
      .subscribe(data => {
        console.log("Catálogo de Perfiles")
        console.log(data)
        this.perfiles   = data.listaDat.perfiles;
        console.log(this.perfiles)
        this.llenaPantalla();
      },
        error => {
        });
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

  //Valida que las contraseñas sean Iguales 
  validarContrasenia(e: any){
    console.log("valida contraseña")
    console.log(e.target.value)
    console.log(this.f.Contrasenia.value,)
    console.log("fecha de hoy")
    console.log(this.hoyDate)
    console.log(this.todayNumber)
    console.log(this.todayString)
    console.log(this.todayISOString)
    if (e.target.value != this.f.Contrasenia.value){
      console.log("Diferentes")
      this.notifier.notify('error', "Las contraseñas deben ser iguales", '');
    }
  }

  guardarUsuario() {

    //this.clear();
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.frmEditUsr.invalid) {
       return;
     }
 
     this.usuario = {
       IdUsuario        :this.f.IdUsuario.value,
       Nombre           :this.f.Nombre.value,
       Contrasenia      :this.f.Contrasenia.value,
       IdEmpleado       :0,
       IdPerfil         :this.f.IdPerfil.value,
       FechaRegistro    :moment(this.hoyDate).format('YYYY-MM-DD'),
       Estatus          :this.Estatus,
       email            :this.f.email.value,
       Bloqueado        :this.Bloqueado,
       Intentos         :this.Intentos,
       UltimaTransaccion:moment(this.hoyDate).format('YYYY-MM-DD'),
     }
 
     this.catalogoService.postRegistraUsuario(this.usuario)
       .pipe(first())
       .subscribe(
         data => {
           console.log("Se intentó Alta Usuario")
           console.log(data)
                 
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
              municipio: this.asentamientos.Municipio,
              entidad: this.asentamientos.EntidadFederativa
            });
            this.colonias = this.asentamientos.asentamientos;
          } else {
            this.info(data.mensaje);
            this.frmEditUsr.patchValue({
              municipio: "",
              entidad: ""
            });
            this.colonias = [];
          }
        },
        error => {
          //this.error(error);
          this.notifier.notify('error', error, '');
        });
  }

  //Valida el RCF del Concesionario
  onChangeEvent(event: any) {
    //this.clear();

    this.concesionarioService.getConsecionarioRFC(event.target.value)
      .pipe(first())
      .subscribe(
        data => {
/*
          if (data.estatus && data.concesionario["IdConcesionario"] != 0) {

            this.idConcesionario = data.concesionario["IdConcesionario"];
            this.f.Nombre.setValue(data.concesionario["Nombre"]);
            this.f.Paterno.setValue(data.concesionario["Paterno"]);
            this.f.Materno.setValue(data.concesionario["Materno"]);
            this.f.CURP.setValue(data.concesionario["CURP"]);
            this.f.IdIdentificacion.setValue(data.concesionario["IdIdentificacion"]);
            this.f.FolioIdentificacion.setValue(data.concesionario["FolioIdentificacion"]);
            this.f.FechaNacimiento.setValue(data.concesionario["FechaNacimiento"]);
            this.f.TipoPersona.setValue(data.concesionario["TipoPersona"]);
            this.f.Genero.setValue(data.concesionario["Genero"]);
            this.f.EstadoCivil.setValue(data.concesionario["EstadoCivil"]);
            this.f.Calle.setValue(data.concesionario["Calle"]);
            this.f.Exterior.setValue(data.concesionario["Exterior"]);
            this.f.Interior.setValue(data.concesionario["Interior"]);
            this.f.cp.setValue(data.concesionario["CP"]);
            this.changeCP();
            this.f.IdColonia.setValue(data.concesionario["IdColonia"]);
            this.f.municipio.setValue(data.concesionario["Municipio"]);
            this.f.entidad.setValue(data.concesionario["EntidadFederativa"]);
            this.f.Telefono.setValue(data.concesionario["Telefono"]);
            this.f.Celular.setValue(data.concesionario["Celular"]);
            this.f.email.setValue(data.concesionario["email"]);
            this.f.IdSindicato.setValue(data.concesionario["IdSindicato"]);
            this.getCatalogoTposAsignacion(data.concesionario["IdSindicato"]);
            this.f.IdAsignacionSindicato.setValue(data.concesionario["IdAsignacionSindicato"]);
            this.f.NumeroConcesion.setValue(data.concesionario["NumeroConcesion"]);
          } else if (data.estatus && data.concesionario["IdConcesionario"] == 0) {
            //this.info(data.mensaje);
            this.idConcesionario = 0;
            this.f.Nombre.setValue("");
            this.f.Paterno.setValue("");
            this.f.Materno.setValue("");
            this.f.CURP.setValue("");
            this.f.IdIdentificacion.setValue(0);
            this.f.FolioIdentificacion.setValue("");
            this.f.FechaNacimiento.setValue("");
            //this.f.TipoPersona.setValue(0);
            this.f.TipoPersona.setValue("F");
            this.f.Genero.setValue(0);
            this.f.EstadoCivil.setValue(0);
            this.f.Calle.setValue("");
            this.f.Exterior.setValue("");
            this.f.Interior.setValue("");
            this.f.cp.setValue("");
            this.f.IdColonia.setValue(0);
            this.f.municipio.setValue("");
            this.f.entidad.setValue("");
            this.f.Telefono.setValue("");
            this.f.Celular.setValue("");
            this.f.email.setValue("");
            this.f.IdSindicato.setValue(0);
            this.f.IdAsignacionSindicato.setValue(0);
            this.f.NumeroConcesion.setValue("");
          } else if (!data.estatus) {
            //this.info(data.mensaje);
            this.notifier.notify('info', data.mensaje, '');
            this.idConcesionario = 0;
            this.f.Nombre.setValue("");
            this.f.Paterno.setValue("");
            this.f.Materno.setValue("");
            this.f.CURP.setValue("");
            this.f.IdIdentificacion.setValue(0);
            this.f.FolioIdentificacion.setValue("");
            this.f.FechaNacimiento.setValue("");
            //this.f.TipoPersona.setValue(0);
            this.f.TipoPersona.setValue("F");
            this.f.Genero.setValue(0);
            this.f.EstadoCivil.setValue(0);
            this.f.Calle.setValue("");
            this.f.Exterior.setValue("");
            this.f.Interior.setValue("");
            this.f.cp.setValue("");
            this.f.IdColonia.setValue(0);
            this.f.municipio.setValue("");
            this.f.entidad.setValue("");
            this.f.Telefono.setValue("");
            this.f.Celular.setValue("");
            this.f.email.setValue("");
            this.f.IdSindicato.setValue(0);
            this.f.IdAsignacionSindicato.setValue(0);
            this.f.NumeroConcesion.setValue("");          
          }
          */
        },
        error => {
          this.notifier.notify('error', error, '');
        });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Manejo de Alertas
  success(message: string) {
    this.alertService.success(message, 'success');
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


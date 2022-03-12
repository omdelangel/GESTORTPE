import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoPerfiles, UsuariosAltaEdicion,CatalogoSindicatos, CatalogoTpoAsignacion, ConcesionarioAltaEdicion, CP, Asentamientos, Identificaciones } from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { PreregistroDialogComponent } from '../../_components/';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import { formatDate } from '@angular/common';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/*
interface Genero {
  Genero: string;
  viewValue: string;
}
interface TipoPersona {
  TipoPersona: string;
  viewValue: string;
}
interface EstadoCivil {
  EstadoCivil: string;
  viewValue: string;
}
*/
@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.scss']
})


export class AltaUsuariosComponent implements OnInit {
  private readonly notifier: NotifierService;
  hoyDate : Date = new Date();
  todayNumber: number = Date.now();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  Estatus    :string='A';
  Intentos   :number=0;
  Bloqueado  :boolean=false; 
  frmAltaUsr!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  concesionario!: ConcesionarioAltaEdicion;
  usuarios!: UsuariosAltaEdicion;
  sindicatos: CatalogoSindicatos[] = [];
  perfiles: CatalogoPerfiles[] = [];
  asignaciones: CatalogoTpoAsignacion[] = [];
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
 

  //Catálogos locales
  /*
  genero: Genero[] = [
    { Genero: 'M', viewValue: 'Masculino' },
    { Genero: 'F', viewValue: 'Femenino' }
  ];

  tiposPersona: TipoPersona[] = [
    { TipoPersona: 'F', viewValue: 'Física' },
    { TipoPersona: 'M', viewValue: 'Moral' },
  ];

  estadoCivil: EstadoCivil[] = [
    { EstadoCivil: 'S', viewValue: 'Soltero' },
    { EstadoCivil: 'C', viewValue: 'Casado' },
    { EstadoCivil: 'D', viewValue: 'Divorciado' },
    { EstadoCivil: 'V', viewValue: 'Viudo' },
  ];
  */


  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<AltaUsuariosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {

      this.notifier = notifierService;   
     
  }

  ngOnInit(): void {

    this.clear();
    this.getCatalogoPerfiles();
    this.getCatalogoSindicatos();
    this.getCatalogoIdentificaciones();

    //Validación de campos en pantalla
    this.frmAltaUsr = this.formBuilder.group({
      'idUsuario'       : ['', Validators.required],
      'Nombre'          : ['', Validators.required],
      'IdPerfil'        : ['', Validators.required],
      'Contrasenia'     : ['', [Validators.required, Validators.min(3) ]],
      'RepContrasenia'  : ['', [Validators.required, Validators.min(3) ]],
      'email'           : ['', Validators.required],
    }); 
  }


  get f() { return this.frmAltaUsr.controls; }

  onSubmit() {
    if (this.frmAltaUsr.valid) {

    } else {
      return
    }
  }

   //Llena catálogo de Perfiles
   getCatalogoPerfiles() {
    this.catalogoService.getCatalogoSindicatos()
      .pipe(first())
      .subscribe(data => {
        this.perfiles = data.sindicatos;
      },
        error => {

        });
  }  
   //Llena catálogo de Sindicatos
  getCatalogoSindicatos() {
    this.catalogoService.getCatalogoSindicatos()
      .pipe(first())
      .subscribe(data => {
        this.sindicatos = data.sindicatos;
      },
        error => {

        });
  }

  //Llena catálogo de Identificaciones
  getCatalogoIdentificaciones() {
    this.catalogoService.getCatalogoIdentificacion()
      .pipe(first())
      .subscribe(data => {
        this.identificaciones = data.identificaciones;
      },
        error => {

        });
  }

  //Llena catálogo de Tipos de Asignación
  getCatalogoTposAsignacion(sindicato: any) {
    this.catalogoService.getCatalogoTposAsignacion(sindicato)
      .pipe(first())
      .subscribe(data => {
        this.asignaciones = data.asignaciones;
      },
        error => {
          
        });
  }

  //Evento en cambio de Sindicato
  onSelectionChanged(value: any) {

    if (value.value == 0) {
//      this.frmAltaUsr.get('IdAsignacionSindicato')?.disable();
    } else {
//      this.frmAltaUsr.get('IdAsignacionSindicato')?.enable();
      this.getCatalogoTposAsignacion(value.value);
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

  //Registra el concesionario
  guardarConcesionario() {

   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaUsr.invalid) {
      return;
    }
    
    this.fechaNacimiento = moment(this.f.FechaNacimiento.value).format('YYYY/MM/DD');
    if (this.idConcesionario == 0) {
      this.idConcesionario == 0;
    } else {
      this.idConcesionario == this.idConcesionario;
    }
    
/*
    this.usuarios = {
      IdUsuario        :this.f.idUsuario.value,
      Nombre           :this.f.Nombre.value,
      Contrasenia      :this.f.Contrasenia.value,
      IdEmpleado       :number,
      IdPerfil         :this.f.IdPerfil.value,
      FechaRegistro    :this.todayISOString,
      Estatus          :this.Estatus,
      email            :this.f.email.value,
      Bloqueado        :this.Bloqueado,
      Intentos         :this.Intentos,
      UltimaTransaccion:this.todayISOString,
    }
*/
    this.concesionarioService.postRegistraConcesionario(this.concesionario)
      .pipe(first())
      .subscribe(
        data => {
          if (data.estatus) {
            this.idConcesionario = data.IdConcesionario;
//jasg            this.nombreConcesionario = this.f.Nombre.value + " " + this.f.Paterno.value + " " + this.f.Materno.value;
            this.concesionarioService.sendIdConce(this.idConcesionario, this.nombreConcesionario);          
            //this.success(data.mensaje);
            this.notifier.notify('success', data.mensaje, '');    
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
            this.frmAltaUsr.patchValue({
              municipio: this.asentamientos.Municipio,
              entidad: this.asentamientos.EntidadFederativa
            });
            this.colonias = this.asentamientos.asentamientos;
          } else {
            this.info(data.mensaje);
            this.frmAltaUsr.patchValue({
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


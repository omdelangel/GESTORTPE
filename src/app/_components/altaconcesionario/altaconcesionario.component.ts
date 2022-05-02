import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoSindicatos, CatalogoTpoAsignacion, ConcesionarioAltaEdicion, CP, Asentamientos, Identificaciones } from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreregistroDialogComponent } from '../preregistro-dialog';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

@Component({
  selector: 'app-altaconcesionario',
  templateUrl: './altaconcesionario.component.html',
  styleUrls: ['./altaconcesionario.component.scss']
})
export class AltaconcesionarioComponent implements OnInit {
  private readonly notifier: NotifierService;

  frmStepOne!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  concesionario!: ConcesionarioAltaEdicion;
  sindicatos: CatalogoSindicatos[] = [];
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
  piloto: boolean = false;
 

  //Catálogos locales
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


  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<PreregistroDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier = notifierService;   
     
  }

  ngOnInit(): void {

    this.getCatalogoSindicatos();
    this.getCatalogoIdentificaciones();

    //Validación de campos en pantalla
    this.frmStepOne = this.formBuilder.group({
      'RFC': ['', Validators.required],
      'IdSindicato': ['', [Validators.required]],
      'IdAsignacionSindicato': ['', Validators.required],
      'NumeroConcesion': [''],
      'CURP': [''],
      'Nombre': ['', Validators.required],
      'Paterno': ['', Validators.required],
      'Materno': [''],
      'TipoPersona': ['F', Validators.required],
      'Genero': ['', Validators.required],
      'EstadoCivil': [''],
      'FechaNacimiento': ['', Validators.required],
      'cp': ['', Validators.required],
      'municipio': [{ value: "", disabled: true }],
      'entidad': [{ value: "", disabled: true }],
      'IdColonia': ['', Validators.required],
      'Calle': ['', Validators.required],
      'Exterior': ['', Validators.required],
      'Interior': [''],
      'Telefono': ['', Validators.required],
      'Celular': ['', Validators.required],
      'email':  ['', [Validators.required, Validators.email]],
      'IdIdentificacion': ['', Validators.required],
      'FolioIdentificacion': ['', Validators.required]
    });

   
  }


  get f() { return this.frmStepOne.controls; }

  onSubmit() {

    if (this.frmStepOne.valid) {

    } else {
      return
    }
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

    this.piloto = false;

    for (let sin of this.sindicatos) {
      if (value.value == sin.IdSindicato && sin.Piloto == true) {
        this.piloto = sin.Piloto;
        break;
      }
}

    this.f.IdAsignacionSindicato.setValue("");

    if (value.value == 0) {
      this.frmStepOne.get('IdAsignacionSindicato')?.disable();
    } else {
      this.frmStepOne.get('IdAsignacionSindicato')?.enable();
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

  //Registra el concesionario
  guardarConcesionario() {

   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmStepOne.invalid) {
      return;
    }

    this.fechaNacimiento = moment(this.f.FechaNacimiento.value).format('YYYY/MM/DD');
    if (this.idConcesionario == 0) {
      this.idConcesionario == 0;
    } else {
      this.idConcesionario == this.idConcesionario;
    }


    this.concesionario = {
      IdConcesionario: this.idConcesionario, Nombre: this.f.Nombre.value, Paterno: this.f.Paterno.value, Materno: this.f.Materno.value,
      NombreCompleto: "", RFC: this.f.RFC.value, CURP: this.f.CURP.value, FechaNacimiento: this.fechaNacimiento, TipoPersona: this.f.TipoPersona.value,
      Genero: this.f.Genero.value, EstadoCivil: this.f.EstadoCivil.value, Calle: this.f.Calle.value, Exterior: this.f.Exterior.value,
      Interior: this.f.Interior.value, IdColonia: this.f.IdColonia.value, Telefono: this.f.Telefono.value, Celular: this.f.Celular.value,
      email: this.f.email.value, IdIdentificacion: this.f.IdIdentificacion.value, FolioIdentificacion: this.f.FolioIdentificacion.value,
      IdSindicato: this.f.IdSindicato.value, IdAsignacionSindicato: this.f.IdAsignacionSindicato.value, NumeroConcesion: this.f.NumeroConcesion.value
    }

    this.concesionarioService.postRegistraConcesionario(this.concesionario)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus) {
            this.idConcesionario = data.IdConcesionario;
            this.nombreConcesionario = this.f.Nombre.value + " " + this.f.Paterno.value + " " + this.f.Materno.value;
            this.concesionarioService.sendIdConce(this.idConcesionario, this.nombreConcesionario);          
            //this.success(data.mensaje);
            this.notifier.notify('success', data.mensaje, '');    
          } else {

            //this.warn(data.mensaje);            
            this.notifier.notify('warning', data.mensaje, '');
            this.submitted = false;

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
            this.frmStepOne.patchValue({
              municipio: this.asentamientos.Municipio,
              entidad: this.asentamientos.EntidadFederativa
            });
            this.colonias = this.asentamientos.asentamientos;
          } else {
  
            this.frmStepOne.patchValue({
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
          } else if (data.estatus == false) {           
            //this.info(data.mensaje);
            this.f.RFC.setValue("");
            this.f.TipoPersona.setValue('F');
            this.notifier.notify('info', data.mensaje);
            
          }
        },
        error => {
          this.notifier.notify('error', error);
        });
  }



}

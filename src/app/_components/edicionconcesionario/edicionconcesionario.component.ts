import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService, VehiculoService} from '../../_services';
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

//Catálogos locales
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
  selector: 'app-edicionconcesionario',
  templateUrl: './edicionconcesionario.component.html',
  styleUrls: ['./edicionconcesionario.component.scss']
})
export class EdicionconcesionarioComponent implements OnInit {
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
  idVehiculo: number = 0;
  cp: string = "";
  asentamientos!: CP;
  municipio: string = "";
  entidadFederativa: string = "";
  colonias: Asentamientos[] = [];
  identificaciones: Identificaciones[] = [];
  fechaNacimiento: string = "";
  asigna: boolean = false;
  nombreConcesionario: string = "";


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
    private vehiculoService: VehiculoService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<PreregistroDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.notifier = notifierService; 
    this.idConcesionario = data.IdConcesionario;
    this.idVehiculo = data.IdVehiculo;

    this.getCatalogoSindicatos();
    this.getCatalogoIdentificaciones();
    this.getConcesionarioVehiculo(this.idConcesionario, this.idVehiculo);

  }

  ngOnInit(): void {

    //this.clear();

    //Validación de campos en pantalla
    this.frmStepOne = this.formBuilder.group({
      'RFC': [({ value: "", disabled: true }), Validators.required],
      'IdSindicato': ['', Validators.required],
      'IdAsignacionSindicato': [({ value: 0, disabled: true })],
      'NumeroConcesion': [({ value: "", disabled: true }), Validators.required],
      'CURP': [({ value: "", disabled: true })],
      'Nombre': ['', Validators.required],
      'Paterno': ['', Validators.required],
      'Materno': [''],
      'TipoPersona': ['', Validators.required],
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
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }

  //Obtiene el catálogo de sindicatos
  getCatalogoSindicatos() {
    this.catalogoService.getCatalogoSindicatos()
      .pipe(first())
      .subscribe(data => {
        this.sindicatos = data.sindicatos;       

      },
        error => {

        });
  }

  //Obtiene el catálogo de identificaciones
  getCatalogoIdentificaciones() {
    this.catalogoService.getCatalogoIdentificacion()
      .pipe(first())
      .subscribe(data => {
        this.identificaciones = data.identificaciones;
      },
        error => {

        });
  }

  //Obtiene el catálogo de tipos de asignción
  getCatalogoTposAsignacion(sindicato: any) {
    this.catalogoService.getCatalogoTposAsignacion(sindicato)
      .pipe(first())
      .subscribe(data => {
        this.asignaciones = data.asignaciones;
      },
        error => {
        });
  }

  //Consulta los datos del concesionario
  getConcesionarioVehiculo(idConcesionario: number, idVehiculo: number) {
    this.clear();

    this.concesionarioService.getConsecionarioVehiculo(idConcesionario, idVehiculo)
      .pipe(first())
      .subscribe(data => {

        this.concesionario = data.concesionario;
        //this.idConcesionario = data.concesionario[0].IdConcesionario;
        this.f.Nombre.setValue(data.concesionario[0].Nombre);
        this.f.Paterno.setValue(data.concesionario[0].Paterno);
        this.f.Materno.setValue(data.concesionario[0].Materno);
        this.f.RFC.setValue(data.concesionario[0].RFC);
        this.f.CURP.setValue(data.concesionario[0].CURP);
        this.f.IdIdentificacion.setValue(data.concesionario[0].IdIdentificacion);
        this.f.FolioIdentificacion.setValue(data.concesionario[0].FolioIdentificacion);
        this.f.FechaNacimiento.setValue(data.concesionario[0].FechaNacimiento);
        this.f.TipoPersona.setValue(data.concesionario[0].TipoPersona);
        this.f.Genero.setValue(data.concesionario[0].Genero);
        this.f.EstadoCivil.setValue(data.concesionario[0].EstadoCivil);
        this.f.Calle.setValue(data.concesionario[0].Calle);
        this.f.Exterior.setValue(data.concesionario[0].Exterior);
        this.f.Interior.setValue(data.concesionario[0].Interior);
        this.f.cp.setValue(data.concesionario[0].CP);
        this.changeCP();
        this.f.IdColonia.setValue(data.concesionario[0].IdColonia);
        this.f.municipio.setValue(data.concesionario[0].Municipio);
        this.f.entidad.setValue(data.concesionario[0].EntidadFederativa);
        this.f.Telefono.setValue(data.concesionario[0].Telefono);
        this.f.Celular.setValue(data.concesionario[0].Celular);
        this.f.email.setValue(data.concesionario[0].email);
        this.f.IdSindicato.setValue(data.concesionario[0].IdSindicato);
        this.getCatalogoTposAsignacion(data.concesionario[0].IdSindicato);
        this.f.IdAsignacionSindicato.setValue(data.concesionario[0].IdAsignacionSindicato);
        this.f.NumeroConcesion.setValue(data.concesionario[0].NumeroConcesion);

        if (data.concesionario[0].IdAsignacionSindicato == 6 || data.concesionario[0].IdAsignacionSindicato == 3) {
          this.asigna = true;
          this.concesionarioService.sendView(true);
        } else {
          this.asigna = false;
          this.concesionarioService.sendView(false);
        }

        this.concesionarioService.sendIdConceVehi(this.idConcesionario, this.idVehiculo);

      },
        error => {
          this.notifier.notify('error', error);
        });
  }

  //LLena el catálogo de tpos de asignación de acuerdo al Sindicato seleccionado
  onSelectionChanged(value: any) {

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

  //Edita al concesionario
  guardarConcesionario() {

    //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmStepOne.invalid) {
      return;
    }

    this.fechaNacimiento = moment(this.f.FechaNacimiento.value).format('YYYY/MM/DD');

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
            this.concesionarioService.sendIdConceVehi(this.idConcesionario, this.idVehiculo); 
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

  //Busca los datos de domicilio de acuerdo al CP ingresado
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
            //this.info(data.mensaje);
            this.notifier.notify('info', data.mensaje, '');

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


  //Manejo de alertas
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

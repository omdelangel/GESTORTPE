import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, PropietarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { Propietario, CP, Asentamientos, Identificaciones } from '../../_models';
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
  selector: 'app-altapropietario',
  templateUrl: './altapropietario.component.html',
  styleUrls: ['./altapropietario.component.scss']
})
export class AltapropietarioComponent implements OnInit {
  private readonly notifier: NotifierService;

  frmStepThree!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  propietario!: Propietario;
  idPropietario: number = 0;
  cp: string = "";
  asentamientos!: CP;
  municipio: string = "";
  entidadFederativa: string = "";
  colonias: Asentamientos[] = [];
  identificaciones: Identificaciones[] = [];
  idVehiculo: number = 0;
  fechaNacimiento: string = "";
  asigna: boolean = false;

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
    private propietarioService: PropietarioService,
    notifierService: NotifierService) {

      this.notifier = notifierService; 
  }

  ngOnInit(): void {

    this.getCatalogoIdentificaciones();

    //Validación de campos en pantalla
    this.frmStepThree = this.formBuilder.group({
      'RFC': ['', Validators.required],
      'CURP': [''],
      'Nombre': ['', Validators.required],
      'Paterno': ['', Validators.required],
      'Materno': [''],
      'TipoPersona': ['', Validators.required],
      'Genero': ['', Validators.required],
      'EstadoCivil': [''],
      'FechaNacimiento': [''],
      'cp': ['', Validators.required],
      'municipio': [{ value: "", disabled: true }],
      'entidad': [{ value: "", disabled: true }],
      'IdColonia': ['', Validators.required],
      'Calle': [''],
      'Exterior': [''],
      'Interior': [''],
      'Telefono': ['', Validators.required],
      'Celular': [''],
      'email': [''],
      'IdIdentificacion': [''],
      'FolioIdentificacion': [''],
    });

  }

  get f() { return this.frmStepThree.controls; }


  onSubmit() {
    if (this.frmStepThree.valid) {
      //console.log(this.reactiveForm.value)


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

  //Registro de propietario
  guardarPropietario() {

    //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmStepThree.invalid) {
      return;
    }

    if (this.idPropietario == 0) {
      this.idPropietario == 0;
    } else {
      this.idPropietario == this.idPropietario;
    }
  
    this.fechaNacimiento = moment(this.f.FechaNacimiento.value).format('YYYY/MM/DD');

    this.propietario = {
      IdPropietario: this.idPropietario, IdVehiculo: this.idVehiculo, Nombre: this.f.Nombre.value, Paterno: this.f.Paterno.value, Materno: this.f.Materno.value,
      RFC: this.f.RFC.value, CURP: this.f.CURP.value, FechaNacimiento: this.fechaNacimiento, TipoPersona: this.f.TipoPersona.value,
      Genero: this.f.Genero.value, EstadoCivil: this.f.EstadoCivil.value, Calle: this.f.Calle.value, Exterior: this.f.Exterior.value,
      Interior: this.f.Interior.value, IdColonia: this.f.IdColonia.value, Telefono: this.f.Telefono.value, Celular: this.f.Celular.value,
      email: this.f.email.value, IdIdentificacion: this.f.IdIdentificacion.value, FolioIdentificacion: this.f.FolioIdentificacion.value
    }

    this.propietarioService.postRegistraPropietario(this.propietario)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus) {
            this.idPropietario = data.IdPropietario;
            this.propietarioService.sendIdPrope(this.idVehiculo);
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

            this.frmStepThree.patchValue({
              municipio: this.asentamientos.Municipio,
              entidad: this.asentamientos.EntidadFederativa
            });

            this.colonias = this.asentamientos.asentamientos;

          } else {
            //this.info(data.mensaje);
            this.notifier.notify('info', data.mensaje, '');

            this.frmStepThree.patchValue({
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

  //Llena el catálogo de Identificaciones
  getCatalogoIdentificaciones() {
    this.catalogoService.getCatalogoIdentificacion()
      .pipe(first())
      .subscribe(data => {
        this.identificaciones = data.identificaciones;
      },
        error => {

        });
  }

  //Valida el RFC del propietario
  onChangeEvent(event: any) {

    console.log("ENTRA A CHANGE");

    this.propietarioService.getPropietarioRFC(event.target.value)
      .pipe(first())
      .subscribe(
        data => {

          console.log("data");
          console.log(data);

          if (data.estatus && data.propietario[0].IdPropietario != 0) {
            this.idPropietario = data.propietario[0].IdPropietario;
            this.f.Nombre.setValue(data.propietario[0].Nombre);
            this.f.Paterno.setValue(data.propietario[0].Paterno);
            this.f.Materno.setValue(data.propietario[0].Materno);
            this.f.CURP.setValue(data.propietario[0].CURP);
            this.f.IdIdentificacion.setValue(data.propietario[0].IdIdentificacion);
            this.f.FolioIdentificacion.setValue(data.propietario[0].FolioIdentificacion);
            this.f.FechaNacimiento.setValue(data.propietario[0].FechaNacimiento);
            this.f.TipoPersona.setValue(data.propietario[0].TipoPersona);
            this.f.Genero.setValue(data.propietario[0].Genero);
            this.f.EstadoCivil.setValue(data.propietario[0].EstadoCivil);
            this.f.Calle.setValue(data.propietario[0].Calle);
            this.f.Exterior.setValue(data.propietario[0].Exterior);
            this.f.Interior.setValue(data.propietario[0].Interior);
            this.f.cp.setValue(data.propietario[0].CP);
            this.changeCP();
            this.f.IdColonia.setValue(data.propietario[0].IdColonia);
            this.f.municipio.setValue(data.propietario[0].Municipio);
            this.f.entidad.setValue(data.propietario[0].EntidadFederativa);
            this.f.Telefono.setValue(data.propietario[0].Telefono);
            this.f.Celular.setValue(data.propietario[0].Celular);
            this.f.email.setValue(data.propietario[0].email);
          } else if (data.estatus && data.propietario[0].IdPropietario == 0) {
            //this.info(data.mensaje);
            this.idPropietario = 0;
            this.f.Nombre.setValue("");
            this.f.Paterno.setValue("");
            this.f.Materno.setValue("");
            this.f.CURP.setValue("");
            this.f.IdIdentificacion.setValue(0);
            this.f.FolioIdentificacion.setValue("");
            this.f.FechaNacimiento.setValue("");
            this.f.TipoPersona.setValue(0);
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
          } else if (!data.estatus) {
            //this.info(data.mensaje);
            this.notifier.notify('info', data.mensaje, '');
            this.idPropietario = 0;
            this.f.Nombre.setValue("");
            this.f.Paterno.setValue("");
            this.f.Materno.setValue("");
            this.f.CURP.setValue("");
            this.f.IdIdentificacion.setValue(0);
            this.f.FolioIdentificacion.setValue("");
            this.f.FechaNacimiento.setValue("");
            this.f.TipoPersona.setValue(0);
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
          }
        },
        error => {
          //this.error(error);
          this.notifier.notify('error', error, '');
        });
  }

  //manejo de alertas
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


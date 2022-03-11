import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, OperadorService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { Operador, CP, Asentamientos, Identificaciones } from '../../_models';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  selector: 'app-dialogo-operador-edita',
  templateUrl: './dialogo-operador-edita.component.html',
  styleUrls: ['./dialogo-operador-edita.component.scss']
})
export class DialogoOperadorEditaComponent implements OnInit {
  private readonly notifier: NotifierService;

  reactiveForm!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  operador: Operador;
  idOperador: number = 0;
  cp: string = "";
  asentamientos!: CP;
  municipio: string = "";
  entidadFederativa: string = "";
  colonias: Asentamientos[] = [];
  identificaciones: Identificaciones[] = [];
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  fechaNacimiento: string = "";
  asigna: boolean = false;
  placa: string = "";
  RFC: string = "";
  operadorEdita: any;


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
    private operadorService: OperadorService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<DialogoOperadorEditaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log(data);

      this.notifier = notifierService; 
      this.idConcesionario = data.IdConcesionario;
      this.idVehiculo = data.IdVehiculo;
      this.operadorEdita = data.data;
      this.idOperador = this.operadorEdita.IdOperador;

      console.log(this.idOperador);

  }

  ngOnInit(): void {

    this.getCatalogoIdentificaciones();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({     
      'Nombre': ['', Validators.required],
      'Paterno': ['', Validators.required],
      'Materno': [''],
      'RFC': [({ value: "", disabled: true }), Validators.required],
      'CURP': [({ value: "", disabled: true }), Validators.required],
      'FechaNacimiento': [''],
      'TipoPersona': ['', Validators.required],
      'Genero': ['', Validators.required],
      'EstadoCivil': [''],
      'Calle': [''],
      'Exterior': [''],
      'Interior': [''],
      'IdColonia': [''],
      'cp': [''],
      'municipio': [{ value: "", disabled: true }],
      'entidad': [{ value: "", disabled: true }],   
      'Telefono': ['', Validators.required],
      'Celular': [''],
      'email': [''],
      'IdIdentificacion': [''],
      'FolioIdentificacion': [''],
      'Licencia': ['', Validators.required],
    });

    this.f.RFC.setValue(this.operadorEdita.RFC);
    this.f.CURP.setValue(this.operadorEdita.CURP);
    this.f.Nombre.setValue(this.operadorEdita.Nombre);
    this.f.Paterno.setValue(this.operadorEdita.Paterno);
    this.f.Materno.setValue(this.operadorEdita.Materno);
    this.f.TipoPersona.setValue(this.operadorEdita.TipoPersona);
    this.f.Genero.setValue(this.operadorEdita.Genero);
    this.f.EstadoCivil.setValue(this.operadorEdita.EstadoCivil);
    this.f.FechaNacimiento.setValue(this.operadorEdita.FechaNacimiento);
    this.f.cp.setValue(this.operadorEdita.CP);
    this.changeCP();
    this.f.IdColonia.setValue(this.operadorEdita.IdColonia);
    this.f.Calle.setValue(this.operadorEdita.Calle);
    this.f.Exterior.setValue(this.operadorEdita.Exterior);
    this.f.Interior.setValue(this.operadorEdita.Interior);
    this.f.Telefono.setValue(this.operadorEdita.Telefono);
    this.f.Celular.setValue(this.operadorEdita.Celular);
    this.f.email.setValue(this.operadorEdita.email);
    this.f.IdIdentificacion.setValue(this.operadorEdita.IdIdentificacion);
    this.f.FolioIdentificacion.setValue(this.operadorEdita.FolioIdentificacion);
    this.f.Licencia.setValue(this.operadorEdita.Licencia);
  }

  get f() { return this.reactiveForm.controls; }


  onSubmit() {
    if (this.reactiveForm.valid) {
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
  guardaOperador() {

    //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }

  
    this.fechaNacimiento = moment(this.f.FechaNacimiento.value).format('YYYY/MM/DD');

    this.operador = {
      IdOperador: this.idOperador, IdVehiculo: this.idVehiculo, IdConcesionario: this.idConcesionario,  Placa: this.placa,
      Nombre: this.f.Nombre.value, Paterno: this.f.Paterno.value, Materno: this.f.Materno.value, NombreCompleto: "",
      RFC: this.f.RFC.value, CURP: this.f.CURP.value, FechaNacimiento: this.fechaNacimiento, TipoPersona: this.f.TipoPersona.value,
      Genero: this.f.Genero.value, EstadoCivil: this.f.EstadoCivil.value, Calle: this.f.Calle.value, Exterior: this.f.Exterior.value,
      Interior: this.f.Interior.value, IdColonia: this.f.IdColonia.value, Telefono: this.f.Telefono.value, Celular: this.f.Celular.value,
      email: this.f.email.value, IdIdentificacion: this.f.IdIdentificacion.value, FolioIdentificacion: this.f.FolioIdentificacion.value,
      Licencia: this.f.Licencia.value, Estatus: ""
    }

    console.log("this.operador");
    console.log(this.operador);

    this.operadorService.postRegistraOperador(this.operador)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus) {         
            this.dialogRef.close();
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

            this.reactiveForm.patchValue({
              municipio: this.asentamientos.Municipio,
              entidad: this.asentamientos.EntidadFederativa
            });

            this.colonias = this.asentamientos.asentamientos;

          } else {
            //this.info(data.mensaje);
            this.notifier.notify('info', data.mensaje, '');

            this.reactiveForm.patchValue({
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


  onNoClick(): void {
    this.dialogRef.close();
  }


   

}

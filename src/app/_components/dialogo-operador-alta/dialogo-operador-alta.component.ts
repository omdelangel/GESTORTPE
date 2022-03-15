import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, OperadorService } from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { Operador, CP, Asentamientos, Identificaciones } from '../../_models';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogoOperadorEditaComponent } from '../dialogo-operador-edita';

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
  selector: 'app-dialogo-operador-alta',
  templateUrl: './dialogo-operador-alta.component.html',
  styleUrls: ['./dialogo-operador-alta.component.scss']
})
export class DialogoOperadorAltaComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreCompleto', 'RFC', 'FechaNacimiento',
    'TipoPersona', 'EntidadFederativa', 'Telefono', 'Celular', 'email', 'Licencia', 'Estatus', 'actions']
  dataSource!: MatTableDataSource<Operador>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
  operadores: Operador[] = [];
  estatus: string = "";
  condition: boolean = false;
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
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogoOperadorAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.notifier = notifierService;
    this.idConcesionario = data.IdConcesionario;
    this.idVehiculo = data.IdVehiculo;
    this.placa = data.Placa;

    this.getConsultaOperadores(this.placa);

  }

  ngOnInit(): void {

    this.getCatalogoIdentificaciones();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Nombre': ['', Validators.required],
      'Paterno': ['', Validators.required],
      'Materno': [''],
      'RFC': ['', Validators.required],
      'CURP': [''],
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
      IdOperador: this.idOperador, IdVehiculo: this.idVehiculo, IdConcesionario: this.idConcesionario, Placa: this.placa,
      Nombre: this.f.Nombre.value, Paterno: this.f.Paterno.value, Materno: this.f.Materno.value, NombreCompleto: "",
      RFC: this.f.RFC.value, CURP: this.f.CURP.value, FechaNacimiento: this.fechaNacimiento, TipoPersona: this.f.TipoPersona.value,
      Genero: this.f.Genero.value, EstadoCivil: this.f.EstadoCivil.value, Calle: this.f.Calle.value, Exterior: this.f.Exterior.value,
      Interior: this.f.Interior.value, IdColonia: this.f.IdColonia.value, Telefono: this.f.Telefono.value, Celular: this.f.Celular.value,
      email: this.f.email.value, IdIdentificacion: this.f.IdIdentificacion.value, FolioIdentificacion: this.f.FolioIdentificacion.value,
      Licencia: this.f.Licencia.value, Estatus: ""
    }

    this.operadorService.postRegistraOperador(this.operador)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus) {
            this.f.RFC.enable();
            this.f.CURP.enable();
            this.getConsultaOperadores(this.placa);
            this.f.Nombre.setValue("");
            this.f.Paterno.setValue("");
            this.f.Materno.setValue("");
            this.f.RFC.setValue("");
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
            this.f.Licencia.setValue("");
            this.notifier.notify('success', data.mensaje, '');
          } else {
            this.getConsultaOperadores(this.placa);
            this.notifier.notify('warning', data.mensaje, '');
          }
        },
        error => {
          this.notifier.notify('error', error, '');
        });

  }

  //Obtiene los datos de Municipio, Entidad y Colonia
  changeCP(): void {
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

  //Valida el RFC del operador
  onChangeEvent(event: any) {


    this.operadorService.getOperadorRFC(event.target.value)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus && data.operador[0].IdOperador != 0) {
            this.idOperador = data.operador[0].IdOperador;
            this.f.Nombre.setValue(data.operador[0].Nombre);
            this.f.Paterno.setValue(data.operador[0].Paterno);
            this.f.Materno.setValue(data.operador[0].Materno);
            this.f.CURP.setValue(data.operador[0].CURP);
            this.f.IdIdentificacion.setValue(data.operador[0].IdIdentificacion);
            this.f.FolioIdentificacion.setValue(data.operador[0].FolioIdentificacion);
            this.f.FechaNacimiento.setValue(data.operador[0].FechaNacimiento);
            this.f.TipoPersona.setValue(data.operador[0].TipoPersona);
            this.f.Genero.setValue(data.operador[0].Genero);
            this.f.EstadoCivil.setValue(data.operador[0].EstadoCivil);
            this.f.Calle.setValue(data.operador[0].Calle);
            this.f.Exterior.setValue(data.operador[0].Exterior);
            this.f.Interior.setValue(data.operador[0].Interior);
            this.f.cp.setValue(data.operador[0].CP);
            this.changeCP();
            this.f.IdColonia.setValue(data.operador[0].IdColonia);
            this.f.municipio.setValue(data.operador[0].Municipio);
            this.f.entidad.setValue(data.operador[0].EntidadFederativa);
            this.f.Telefono.setValue(data.operador[0].Telefono);
            this.f.Celular.setValue(data.operador[0].Celular);
            this.f.email.setValue(data.operador[0].email);
            this.f.Licencia.setValue(data.operador[0].Licencia);
          } else if (data.estatus && data.operador[0].IdOperador == 0) {
            //this.info(data.mensaje);
            this.idOperador = 0;
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
            this.f.Licencia.setValue("");
          } else if (!data.estatus) {
            //this.info(data.mensaje);
            this.notifier.notify('info', data.mensaje, '');
            this.idOperador = 0;
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
            this.f.Licencia.setValue("");
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

  editar(e: any) {

    this.condition = false;
    // const dialogRef = this.dialog.open(DialogoOperadorEditaComponent, {
    //     disableClose: true,
    //    data: { data: e, IdConcesionario: this.idConcesionario, IdVehiculo: this.idVehiculo},
    //width: '1500px',
    //height: '900px'
    //    });

    //   dialogRef.afterClosed().subscribe(res => {
    ////   });

    this.f.RFC.disable();
    this.idOperador = e.IdOperador;
    this.f.RFC.setValue(e.RFC);
    this.f.CURP.disable();
    this.f.CURP.setValue(e.CURP);
    this.f.Nombre.setValue(e.Nombre);
    this.f.Paterno.setValue(e.Paterno);
    this.f.Materno.setValue(e.Materno);
    this.f.TipoPersona.setValue(e.TipoPersona);
    this.f.Genero.setValue(e.Genero);
    this.f.EstadoCivil.setValue(e.EstadoCivil);
    this.f.FechaNacimiento.setValue(e.FechaNacimiento);
    this.f.cp.setValue(e.CP);
    this.changeCP();
    this.f.IdColonia.setValue(e.IdColonia);
    this.f.Calle.setValue(e.Calle);
    this.f.Exterior.setValue(e.Exterior);
    this.f.Interior.setValue(e.Interior);
    this.f.Telefono.setValue(e.Telefono);
    this.f.Celular.setValue(e.Celular);
    this.f.email.setValue(e.email);
    this.f.IdIdentificacion.setValue(e.IdIdentificacion);
    this.f.FolioIdentificacion.setValue(e.FolioIdentificacion);
    this.f.Licencia.setValue(e.Licencia);


  }


  //Consulta los operadores
  getConsultaOperadores(placa: string) {

    this.operadorService.getOperadorVehiculo(placa)
      .pipe(first())
      .subscribe(data => {


        if (data.estatus == true && data.operadores != "") {

          // Assign the data to the data source for the table to render
          this.operadores = data.operadores;
          this.idConcesionario = data.IdConcesionario;
          this.idVehiculo = data.IdVehiculo;


          this.dataSource = new MatTableDataSource(this.operadores);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";


        } else if (data.estatus == false) {

          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "hidden";

          this.notifier.notify('warning', data.mensaje);

        } else if (data.estatus == true && data.operadores == "") {

          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "hidden";

          this.notifier.notify('warning', data.mensaje);

          this.idConcesionario = data.IdConcesionario;
          this.idVehiculo = data.IdVehiculo;
          //this.openDialog();


        }


      },
        error => {
          this.notifier.notify('success', error);

        });

  }

  changeEstatus(e: any) {

    this.idOperador = e.IdOperador;
    if (e.Estatus == "A") {
      this.estatus = "I";
    } else if (e.Estatus == "I") {
      this.estatus = "A";
    }

    this.operadorService.postBajaOperador(this.idOperador, this.idVehiculo, this.estatus)
      .pipe(first())
      .subscribe(data => {

        this.getConsultaOperadores(this.placa);
        this.notifier.notify('success', data.mensaje);
      },
        error => {

          this.notifier.notify('success', error);
        });

  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PreRegistro, CatalogoSindicatos } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConcesionarioService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { PreregistroDialogComponent } from '../../_components/preregistro-dialog';
import { PreregistroEdicionDialogComponent } from '../../_components/preregistro-edicion-dialog';
import { EdicionDocumentosComponent } from '../edicion-documentos';
import { EdicionCitaComponent } from '../edicion-cita';
import { DialogoTalleresComponent } from '../dialogo-talleres';
import { DictamenComponent } from '../dictamen';
import { isEmpty } from 'lodash';
import { NotifierService } from 'angular-notifier';
import { CatalogosService } from '../../_services';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-consulta-preregistro',
  templateUrl: './consulta-preregistro.component.html',
  styleUrls: ['./consulta-preregistro.component.scss']
})
export class ConsultaPreregistroComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreCompleto', 'FechaRegistro', 'Marca', 'SubMarca', 'Modelo', 'Placa',
    'FechaCita', 'Dictamen', 'EstatusCita', 'actions'];
  dataSource!: MatTableDataSource<PreRegistro>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  reactiveForm!: FormGroup;
  preRegistro: PreRegistro[] = [];
  sindicatos: CatalogoSindicatos[] = [];
  matcher = new MyErrorStateMatcher();
  submitted = false;


  constructor(public dialog: MatDialog,
    private alertService: AlertService,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) {

    this.notifier = notifierService;
  }

  ngOnInit(): void {


    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'sindicato': ['', Validators.required]
    });


    //this.getConsultaPreRegistro();
    //Llena combos
    this.getCatalogoSindicatos(); 


  }

  get g() { return this.reactiveForm.controls; }

  onSubmit() {  

    this.submitted = true;

     // stop here if form is invalid
     if (this.reactiveForm.invalid) {
      return;
    } else {
      this.getConsultaPreRegistro(this.g.sindicato.value);
    }
  
  }

  getCatalogoSindicatos() {
    this.catalogoService.getCatalogoSindicatos()
      .pipe(first())
      .subscribe(data => {
        this.sindicatos = data.sindicatos;
      },
        error => {

        });
        
  }


  //Abre modal para preregistro
  openDialog(): void {
    const dialogRef = this.dialog.open(PreregistroDialogComponent, {
      disableClose: true,
      width: '100%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaPreRegistro(this.g.sindicato.value);
    });
  }


  //Consulta los datos de concesionarios/preregistro
  getConsultaPreRegistro(idEmpresa: string) {
    //this.clear();


    this.concesionarioService.getPreRegConcesionario(idEmpresa)
      .pipe(first())
      .subscribe(data => {

        if (data.estatus ) {
          this.preRegistro = data.concesionario;
          this.dataSource = new MatTableDataSource(this.preRegistro);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";

        } else {
          this.notifier.notify('warning', data.mensaje)

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "hidden";
      
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "hidden";

        }
      },
        error => {
          this.notifier.notify('error', error);

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "hidden";
      
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "hidden";
        });

  }


  public handlePage(e: any) {

  }


  //Edita el concesionario/preregistro
  editar(e: any) {

    const dialogRef = this.dialog.open(PreregistroEdicionDialogComponent, {
      disableClose: true,
      data: { IdConcesionario: e.IdConcesionario, IdVehiculo: e.IdVehiculo, IdPropietario: e.IdPropietario, Piloto: e.Piloto },
      width: '100%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaPreRegistro(this.g.sindicato.value);
    });

  }



  //Edita los documentos
  documentos(e: any) {

    const dialogRef = this.dialog.open(EdicionDocumentosComponent, {
      disableClose: true,
      data: {
        IdVehiculo: e.IdVehiculo, IdConcesionario: e.IdConcesionario, nombreConcesionario: e.NombreCompleto, marca: e.Marca,
        submarca: e.Submarca, modelo: e.Modelo, Piloto: e.Piloto
      },
      width: '100%',
      //height: '90%'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaPreRegistro(this.g.sindicato.value);
    });

  }

  //Consulta las citas
  citas(e: any) {

    if (e.IdCita == null || e.EstatusCita == "D" || e.EstatusCita == "V" || e.EstatusCita == "C") {

      const dialogRef = this.dialog.open(DialogoTalleresComponent, {
        disableClose: true,
        data: { idCita: e.IdCita, estatusCita: e.EstatusCita, nombreConcesionario: e.NombreCompleto, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo, causa: "Verificacion", piloto: e.Piloto },
        width: '100%',
        //height: '90%'
      });

      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaPreRegistro(this.g.sindicato.value);
      });

    } else {

      const dialogRef = this.dialog.open(EdicionCitaComponent, {
        disableClose: true,
        data: {
          idCita: e.IdCita, NombreConcesionario: e.NombreCompleto, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo,
          marca: e.Marca, submarca: e.Submarca, modelo: e.Modelo, estatusCita: e.EstatusCita, causa: "Verificacion", piloto: e.Piloto
        },
        width: '100%',
        //height: '90%'
      });

      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaPreRegistro(this.g.sindicato.value);
      });

    }

  }


  //Dictaminar
  dictaminar(e: any) {

    if (e.EstatusCita != "A" || e.Dictaminar == 0) {

      this.notifier.notify('info', 'Para poder dictaminar la cita, debe estar activa o tener una fecha posterior!!', '');


    } else {

      const dialogRef = this.dialog.open(DictamenComponent, {
        disableClose: true,
        data: {
          idCita: e.IdCita, NombreConcesionario: e.NombreCompleto, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo,
          marca: e.Marca, submarca: e.Submarca, modelo: e.Modelo, estatusCita: e.EstatusCita, piloto: e.Piloto
        },
        width: '100%',
        //height: '90%'
      });

      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaPreRegistro(this.g.sindicato.value);
      });

    }

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



}

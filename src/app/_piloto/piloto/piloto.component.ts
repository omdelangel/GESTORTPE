import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ConcesionarioPiloto } from 'src/app/_models/piloto.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PilotoService } from 'src/app/_services';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DialogoConfirmaDesinstalacionPilotoComponent } from '../dialogo-confirma-desinstalacion-piloto';
import { DialogoTalleresPilotoComponent } from '../dialogo-talleres-piloto';
import { EdicionCitaPilotoComponent } from '../edicion-cita-piloto';
import { DialogoContratoPilotoComponent } from '../dialogo-contrato-piloto';
import { DialogoDocumentosRegistroPilotoComponent } from '../dialogo-documentos-registro-piloto';
import { DialogoConfirmacionPilotoComponent } from '../dialogo-confirmacion-piloto';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-piloto',
  templateUrl: './piloto.component.html',
  styleUrls: ['./piloto.component.scss']
})
export class PilotoComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreConcesionario', 'TerminoPiloto', 'Marca', 'SubMarca', 'Modelo', 'Placa',
    'TipoVehiculo', 'TipoConvertidor', 'FechaCitaDesinstalacion', 'EstatusCitaDesinstalacion', 'actions'];
  dataSource!: MatTableDataSource<ConcesionarioPiloto>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm!: FormGroup;
  piloto: ConcesionarioPiloto[] = [];


  constructor(public dialog: MatDialog,
    private pilotoService: PilotoService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) {

    this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.getConsultaPiloto();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdConcesionario': [''],
      'IdContrato': [''],
      'NombreConcesionario': [''],
      'TerminoPiloto': [''],
      'IdVehiculo': [''],
      'Marca': [''],
      'Submarca': [''],
      'Modelo': [''],
      'Placa': [''],
      'TipoVehiculo': [''],
      'TipoConvertidor': [''],
      'FechaCitaDesinstalacion': [''],
      'EstatusCitaDesinstalacion': [''],
      'IdCitaDesinstalacion': [''],
    });
  }

  get g() { return this.reactiveForm.controls; }

  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)
    } else {
      return
    }
  }


  //Consulta los datos de concesionarios en programa piloto
  getConsultaPiloto() {

    this.pilotoService.getConcesionariosPiloto()
      .pipe(first())
      .subscribe(data => {

        this.piloto = data.concesionario;
        this.dataSource = new MatTableDataSource(this.piloto);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        error => {

        });
  }

  //Confirma la desinstalación del convertidor
  confirmacion(e: any) {

    const dialogRef = this.dialog.open(DialogoConfirmaDesinstalacionPilotoComponent, {
      data: {
        IdVehiculo: e.IdVehiculo, IdConcesionario: e.IdConcesionario, NombreConcesionario: e.NombreConcesionario, Placa: e.Placa,
        TipoVehiculo: e.TipoVehiculo, TipoConvertidor: e.TipoConvertidor, FechaDesinstalacion: e.FechaCitaDesinstalacion
      },
      disableClose: true,
      //width: '1500px',
      // height: '900px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaPiloto();
    });

  }

  //Registro de Citas para la instalacion
  cita(e: any) {


      if (e.EstatusCitaDesinstalacion == null || e.EstatusCitaDesinstalacion == "V" || e.EstatusCitaDesinstalacion == "C") {

        const dialogRef = this.dialog.open(DialogoTalleresPilotoComponent, {
          disableClose: true,
          data: { idCita: e.IdCitaDesinstalacion, estatusCita: e.EstatusCitaDesinstalacion, nombreConcesionario: e.NombreConcesionario, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo },

        });

        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaPiloto();
        });


      } else {

        const dialogRef = this.dialog.open(EdicionCitaPilotoComponent, {
          disableClose: true,
          data: {
            idCita: e.IdCitaDesinstalacion, NombreConcesionario: e.NombreConcesionario, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo,
            marca: e.Marca, submarca: e.Submarca, modelo: e.Modelo, estatusCita: e.EstatusCitaDesinstalacion
          },
        });

        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaPiloto();
        });

      }

  }

  //Edita el concesionario/preregistro
  contrato(e: any) {

    if (e.AceptoConvertidor != 1) {

    this.dialog
      .open(DialogoConfirmacionPilotoComponent, {
        data: `Confirma que el CONCESIONARIO está de acuerdo en continuar con los beneficios del programa Cambia y Gana.`,
        width: '30%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.enviaRespuesta(e.IdContrato, 1);

          const dialogRef = this.dialog.open(DialogoContratoPilotoComponent, {
            data: { idContrato: e.IdContrato, nombreConcesionario: e.NombreConcesionario},
            disableClose: true,
            //width: '1500px',
            //height: '900px'
          });

          dialogRef.afterClosed().subscribe(res => {
            this.getConsultaPiloto();
          });



        } else {

          this.enviaRespuesta(e.IdContrato, 0);
          const dialogRef = this.dialog.open(DialogoTalleresPilotoComponent, {
            disableClose: true,
            data: { idCita: e.IdCitaDesinstalacion, estatusCita: e.EstatusCitaDesinstalacion, nombreConcesionario: e.NombreConcesionario, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo },
  
          });
  
          dialogRef.afterClosed().subscribe(res => {
            this.getConsultaPiloto();
          });

        }
      });

    } else {

      const dialogRef = this.dialog.open(DialogoContratoPilotoComponent, {
        data: { idContrato: e.IdContrato, nombreConcesionario: e.NombreConcesionario},
        disableClose: true,
        //width: '1500px',
        //height: '900px'
      });

      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaPiloto();
      });
    }
  }


  enviaRespuesta(idContrato: number, respuesta: number){
    this.pilotoService.postPilotoRespuesta(idContrato, respuesta)
      .pipe(first())
      .subscribe(data => {

        this.notifier.notify('success', data.mensaje);
      },
        error => {
          this.notifier.notify('success', error);
        });
  }



  //Edita los documentos
  documentos(e: any) {

    const dialogRef = this.dialog.open(DialogoDocumentosRegistroPilotoComponent, {
      disableClose: true,
      data: {
        IdVehiculo: e.IdVehiculo, IdConcesionario: e.IdConcesionario, nombreConcesionario: e.NombreConcesionario, marca: e.Marca,
        submarca: e.Submarca, modelo: e.Modelo, piloto: e.Piloto, idContrato: e.IdContrato
      },
      width: '1500px',
      //height: '700px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaPiloto();
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}

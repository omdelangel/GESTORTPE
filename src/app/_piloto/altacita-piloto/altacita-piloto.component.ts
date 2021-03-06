import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HoracitaDialogComponent } from '../../_components/horacita-dialog';
import { Citas, DisponibilidadCitas } from 'src/app/_models/cita.model';
import { PilotoService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { DialogoConfirmacionComponent } from '../../_components/dialogo-confirmacion';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-altacita-piloto',
  templateUrl: './altacita-piloto.component.html',
  styleUrls: ['./altacita-piloto.component.scss']
})
export class AltacitaPilotoComponent implements OnInit {
  private readonly notifier: NotifierService;

  frmStepFour!: FormGroup;
  submitted = false;
  dia: string = "";
  hora: string = "";
  idTallerValue: number = 0;
  nombreValue: string = "";
  domicilioValue: string = "";
  telefonoValue: string = "";
  contactoValue: string = "";
  citas!: Citas;
  disponibles!: DisponibilidadCitas;
  nombreConcesionario: string = "";
  idVehiculoValue: number = 0;
  idConcesionarioValue: number = 0;
  diaHora: any;
  idCitaValue: number = 0;
  estatusCita: string = "";
  

  //Determina si viene del registro o de la formalización
  causaValue: string = "";

  events = [
    {
      title: "Evento 1",
      start: new Date().getTime(),
      description: "evento 1",
      display: 'inverse-background'
    },
    {
      title: "Evento 2",
      start: new Date(new Date().getTime() + 86400000),
      description: "evento 2",
      display: 'inverse-background'
    },
    {
      title: "Evento 3",
      start: new Date(new Date().getTime() + (86400000 * 2)),
      end: new Date(new Date().getTime() + (86400000 * 3)),
      description: "evento 2",
      display: 'inverse-background'
    },
  ]


  //calendar settings
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: "Evento 1",
        start: new Date().getTime(),
        description: "evento 1",
        display: 'inverse-background'
      },
      {
        title: "Evento 2",
        start: new Date(new Date().getTime() + 86400000),
        description: "evento 2",
        display: 'inverse-background'
      },
      {
        title: "Evento 3",
        start: new Date(new Date().getTime() + (86400000 * 2)),
        end: new Date(new Date().getTime() + (86400000 * 3)),
        description: "evento 2",
        display: 'inverse-background'
      },
    ]
  };


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private pilotoService: PilotoService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<AltacitaPilotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    dialogRef.disableClose = true;
    this.notifier = notifierService;
    this.idTallerValue = data.idTaller;
    this.nombreValue = data.nombreTaller;
    this.domicilioValue = data.domicilio;
    this.telefonoValue = data.telefono;
    this.contactoValue = data.contacto;
    this.nombreConcesionario = data.nombreConce;
    this.idConcesionarioValue = data.idConce;
    this.idVehiculoValue = data.idVehi;
    this.causaValue = data.causa;

  }


  ngOnInit(): void {

    //Validación de campos en pantalla
    this.frmStepFour = this.formBuilder.group({

    });

    //throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.frmStepFour.valid) {
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }

  //Registra la cita para desinstalar el convertidor
  guardarCita() {
    //this.clear(); 
    this.submitted = true;

    if (this.idCitaValue == 0 || this.idCitaValue == null || this.estatusCita == "D" || this.estatusCita == "V" || this.estatusCita == "C" ) {

    if (this.dia != undefined && this.hora != undefined && this.dia != "" && this.hora != "") {

      this.diaHora = moment(this.dia + " " + this.hora).format('YYYY-MM-DD HH:mm:ss');
      this.citas = { IdCita: this.idCitaValue, IdVehiculo: this.idVehiculoValue, IdConcesionario: this.idConcesionarioValue, Fecha: this.diaHora, IdTaller: this.idTallerValue }

        this.pilotoService.postRegistraCitaDesinstalacion(this.citas)
          .pipe(first())
          .subscribe(
            data => {

              if (data.estatus) {
                //this.success(data.mensaje);  
                this.notifier.notify('success', data.mensaje, '');
                this.dialogRef.close({ idCita: data.IdCitaDesinstalacion, dia: this.dia, hora: this.hora });
              } else {
                //this.warn(data.mensaje);
                this.notifier.notify('warning', data.mensaje, '');
                this.dialogRef.close({ idCita: 0 });
              }
            },
            error => {
              this.notifier.notify('error', error, '');
            });

      }
   else {

      //this.info("Seleccione fecha y hora de la cita!!!");
      this.notifier.notify('info', "Seleccione fecha y hora de la cita!!!", '');
    }
  } else if (this.idCitaValue != 0 && this.estatusCita == "A") {

    if (this.dia != undefined && this.hora != undefined && this.dia != "" && this.hora != "") {

      this.diaHora = moment(this.dia + " " + this.hora).format('YYYY-MM-DD HH:mm:ss');
      this.citas = { IdCita: this.idCitaValue, IdVehiculo: this.idVehiculoValue, IdConcesionario: this.idConcesionarioValue, Fecha: this.diaHora, IdTaller: this.idTallerValue }

        this.pilotoService.postCitaModificacionConvertidor(this.citas)
          .pipe(first())
          .subscribe(
            data => {

              if (data.estatus) {
                //this.success(data.mensaje);  
                this.notifier.notify('success', data.mensaje, '');
                this.dialogRef.close({ idCita: data.IdCitaDesinstalacion, dia: this.dia, hora: this.hora });
              } else {
                //this.warn(data.mensaje);
                this.notifier.notify('warning', data.mensaje, '');
                this.dialogRef.close({ idCita: 0 });
              }
            },
            error => {
              this.notifier.notify('error', error, '');
            });

      }
   else {

      //this.info("Seleccione fecha y hora de la cita!!!");
      this.notifier.notify('info', "Seleccione fecha y hora de la cita!!!", '');
    }

  }
  }


  //Guarda la cita
  mostrarDialogoConfirmacion(): void {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `¿Desea confirmar la cita?`,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.guardarCita();

        } else {

        }
      });
  }

  //Muestra las horas disponibles del día seleccionado
  handleDateClick(arg: any) {

    const dialogRef = this.dialog.open(HoracitaDialogComponent, {
      //width: '40%',
      //height: '30%',
      data: { fecha: arg.dateStr, idTaller: this.idTallerValue }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.hora = result;
      this.dia = moment(arg.dateStr).format('YYYY-MM-DD');
      //this.clear();
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

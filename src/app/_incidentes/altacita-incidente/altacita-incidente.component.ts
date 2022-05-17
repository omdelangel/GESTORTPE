import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HoracitaDialogComponent } from '../../_components/horacita-dialog';
import { CitasIncidente } from 'src/app/_models';
import { IncidenteService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { DialogoConfirmacionComponent } from '../../_components/dialogo-confirmacion';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-altacita-incidente',
  templateUrl: './altacita-incidente.component.html',
  styleUrls: ['./altacita-incidente.component.scss']
})
export class AltacitaIncidenteComponent implements OnInit {
  private readonly notifier: NotifierService;

  citasIncidente          !:CitasIncidente;

  frmStepFour!: FormGroup;
  submitted = false;
  dia: string = "";
  hora: string = "";
  idTallerValue: number = 0;
  nombreValue: string = "";
  domicilioValue: string = "";
  telefonoValue: string = "";
  contactoValue: string = "";
  nombreConcesionario: string = "";
  idVehiculoValue: number = 0;
  idConcesionarioValue: number = 0;
  diaHora: any;
  idCita: number = 0;
  IdIncidenteSiniestro:number = 0;
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
      description: "evento 3",
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
        description: "evento 3",
        display: 'inverse-background'
      },
    ]
  };


  constructor(private formBuilder: FormBuilder,
    public dialog                 :MatDialog,
    private incidenteService      :IncidenteService,
    notifierService               :NotifierService,
    public dialogRef              :MatDialogRef<AltacitaIncidenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("Data alta cita")
      console.log(data)

    dialogRef.disableClose = true;
    this.notifier               = notifierService;
    this.idTallerValue          = data.idTaller;
    this.nombreValue            = data.nombreTaller;
    this.domicilioValue         = data.domicilio;
    this.telefonoValue          = data.telefono;
    this.contactoValue          = data.contacto;
    this.nombreConcesionario    = data.nombreConce;
    this.idConcesionarioValue   = data.idConce;
    this.idVehiculoValue        = data.idVehi;
    this.idCita                 = data.idCita, 
    this.estatusCita            = data.estatusCita, 
    this.IdIncidenteSiniestro   = data.IdIncidenteSiniestro
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

  //Registra la cita para el Incidente
  guardarCita() {
    console.log("guardar cita")

    this.submitted = true;

    if (this.idCita == 0 || this.idCita == null || this.estatusCita == "" ||this.estatusCita == "D" || this.estatusCita == "V" || this.estatusCita == "C" ) {

    if (this.dia != undefined && this.hora != undefined && this.dia != "" && this.hora != "") {

      this.diaHora = moment(this.dia + " " + this.hora).format('YYYY-MM-DD HH:mm');
      this.citasIncidente = { 
                    IdIncidenteSiniestro    :this.IdIncidenteSiniestro,
                    Fecha                   :this.diaHora,
                    IdTaller                :this.idTallerValue, 
                    IdCita                  :this.idCita 
                  }
        console.log(this.citasIncidente)

        this.incidenteService.postRegistraCitaIncidente(this.citasIncidente)
          .pipe(first())
          .subscribe(
            data => {

              if (data.estatus) {
                console.log("regreso del alta de cita incidente")
                console.log(data)
                //this.success(data.mensaje);  
                this.notifier.notify('success', data.mensaje, '');
                this.dialogRef.close({ idCita: data.IdCita, dia: this.dia, hora: this.hora });
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
  } else if (this.idCita != 0 && this.estatusCita == "A") {

    if (this.dia != undefined && this.hora != undefined && this.dia != "" && this.hora != "") {

      this.diaHora = moment(this.dia + " " + this.hora).format('YYYY-MM-DD HH:mm');
      this.citasIncidente = { 
        IdIncidenteSiniestro    :this.IdIncidenteSiniestro,
        Fecha                   :this.diaHora,
        IdTaller                :this.idTallerValue, 
        IdCita                  :this.idCita 
      }      

        this.incidenteService.postModificaCitaIncidente(this.citasIncidente)
          .pipe(first())
          .subscribe(
            data => {

              if (data.estatus) {
                //this.success(data.mensaje);  
                this.notifier.notify('success', data.mensaje, '');
                this.dialogRef.close({ idCita: data.IdCita, dia: this.dia, hora: this.hora });
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

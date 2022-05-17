import { Component, OnInit, Inject } from '@angular/core';
import { IncidenteService, CitasService } from 'src/app/_services';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../_components/dialogo-confirmacion';
import { DialogoTalleresIncidenteComponent } from '../dialogo-talleres-incidente';
import { NotifierService } from 'angular-notifier';
import { HoracitaDialogComponent } from '../../_components/horacita-dialog/horacita-dialog.component';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-edicion-cita-incidente',
  templateUrl: './edicion-cita-incidente.component.html',
  styleUrls: ['./edicion-cita-incidente.component.scss']
})
export class EdicionCitaIncidenteComponent implements OnInit {
  private readonly notifier: NotifierService;

  Concesionario : string = "";
  reactiveForm!: FormGroup;
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  cancelar: boolean = false;
  nuevaCita: boolean = false;
  valorCancel:boolean = false;
  idCita: number = 0;
  estatusCita: string = "";
  Vehiculo:string = ""; 
  IdIncidenteSiniestro                :number;         


  constructor(
    private incidenteService   : IncidenteService,
    private formBuilder        : FormBuilder,
    public dialog              : MatDialog,
    notifierService            : NotifierService,
    private citaService        : CitasService,
    public dialogRef           : MatDialogRef<EdicionCitaIncidenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.notifier = notifierService;   
    dialogRef.disableClose = true;
    console.log("parametros data edicion")
    console.log(data)
    this.idCita                = data.idCita, 
    this.estatusCita           = data.estatusCita, 
    this.Concesionario         = data.Concesionario, 
    this.idConcesionario       = data.idConcesionario, 
    this.idVehiculo            = data.idVehiculo,
    this.Vehiculo              = data.Vehiculo,
    this.IdIncidenteSiniestro  = data.IdIncidenteSiniestro

    switch (this.estatusCita) {
      case 'A':
        this.cancelar = false;
        this.nuevaCita = false;
        break;
      case 'V':
        this.cancelar = true;
        this.nuevaCita = false;
        break;
      case 'C':
        this.cancelar = true;
        this.nuevaCita = false;
        break;
      default:
        // 
        break;
    }
  }

  ngOnInit(): void {

    this.obtieneCita(this.idCita);

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Concesionario'        : [({ value: "", disabled: true })],
      'Taller'               : [({ value: "", disabled: true })],
      'Domicilio'            : [({ value: "", disabled: true })],
      'Telefono'             : [({ value: "", disabled: true })],
      'Contacto'             : [({ value: "", disabled: true })],
      'Fecha'                : [({ value: "", disabled: true })],
      'Hora'                 : [({ value: "", disabled: true })],
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


  //Consulta los datos del concesionario
  obtieneCita(idCita: number) {
    //this.clear();
    console.log("obtieneCita")
    console.log(idCita)
    
    this.incidenteService.getCitaIncidente(idCita)
      .pipe(first())
      .subscribe(data => {
        console.log("obtieneCita data")
        console.log(data)
    
        this.f.Concesionario.setValue(this.Concesionario);
        this.f.Taller.setValue(data.citaIncidente[0].Taller);
        this.f.Domicilio.setValue(data.citaIncidente[0].Domicilio + " " + data.citaIncidente[0].Colonia + " " + data.citaIncidente[0].CP + " " + data.citaIncidente[0].Municipio + " " + data.citaIncidente[0].EntidadFederativa);
        this.f.Telefono.setValue(data.citaIncidente[0].Telefono);
        this.f.Contacto.setValue(data.citaIncidente[0].Contacto);
        this.f.Fecha.setValue(data.citaIncidente[0].Fecha);
        this.f.Hora.setValue(data.citaIncidente[0].Hora);
      },
        error => {
        });
      
  }

  //Cancela de cita
  cancelarCita() {

    this.incidenteService.postCancelaCitaIncidente(this.IdIncidenteSiniestro, this.idCita)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus) {
            this.valorCancel = true;
            this.dialogRef.close();
            //this.success(data.mensaje);
            this.notifier.notify('success', data.mensaje, '');
          } else {
            this.valorCancel = false;
            //this.warn(data.mensaje);
            this.notifier.notify('warning', data.mensaje, '');
          }
        },
        error => {
          //this.error(error);
          this.notifier.notify('error', error, '');
        });
       
  }

  //Cancela la cita
  mostrarDialogoCancelar(): void {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `¿Desea cancelar la cita?`,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.cancelarCita();        

        } 
      });
  }

  //Cancela la Cita y Agenda una nueva
  mostrarDialogoCancelarReagendar(): void {

    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `¿Desea reagendar una nueva cita?`,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          const dialogRef = this.dialog.open(DialogoTalleresIncidenteComponent, {
            data: {
                  idCita                 :this.idCita, 
                  estatusCita            :this.estatusCita, 
                  IdIncidenteSiniestro   :this.IdIncidenteSiniestro,
                  Concesionario          :this.Concesionario, 
                  idConcesionario        :this.idConcesionario, 
                  idVehiculo             :this.idVehiculo
                  },
                width: '100%'
          });
      
          dialogRef.afterClosed().subscribe(res => {
      
           // let idCita = Number(sessionStorage.getItem("NuevaCita"));
          //  this.obtieneCita(idCita);  
          //  this.cancelar = false;
          //  this.nuevaCita = false;  
           this.dialogRef.close();        
      
          });
      
        } else {

          const dialogRef = this.dialog.open(DialogoTalleresIncidenteComponent, {
            data: { 
                  idCita                 :this.idCita, 
                  estatusCita            :this.estatusCita, 
                  IdIncidenteSiniestro   :this.IdIncidenteSiniestro,
                  Concesionario          :this.Concesionario, 
                  idConcesionario        :this.idConcesionario, 
                  idVehiculo             :this.idVehiculo
                  },
            width: '100%'
          });
      
          dialogRef.afterClosed().subscribe(res => {
            let idCita = Number(sessionStorage.getItem("NuevaCita"));
            this.obtieneCita(idCita);                  
          });
        }
      });  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  
}

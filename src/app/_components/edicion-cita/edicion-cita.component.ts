import { Component, OnInit, Inject } from '@angular/core';
import { Citas, DatosCita } from 'src/app/_models/cita.model';
import { CitasService } from 'src/app/_services';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_alert';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion';
import { DialogoTalleresComponent } from '../dialogo-talleres';
import { DialogoDictamencitaComponent } from '../dialogo-dictamencita';
import { NotifierService } from 'angular-notifier';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edicion-cita',
  templateUrl: './edicion-cita.component.html',
  styleUrls: ['./edicion-cita.component.scss']
})
export class EdicionCitaComponent implements OnInit {
  private readonly notifier: NotifierService;

  Concesionario: string = "";
  idCita: number = 0;
  reactiveForm!: FormGroup;
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  cancelar: boolean = false;
  nuevaCita: boolean = false;
  valorCancel: boolean = false;
  marca: string = "";
  submarca: string = "";
  modelo: string = "";
  estatusCita: string = "";
  causaValue: string = "";
  piloto: boolean = false;

  constructor(private citaService: CitasService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<EdicionCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    this.notifier = notifierService;   
    dialogRef.disableClose = true;
    this.idCita = data.idCita;
    this.Concesionario = data.NombreConcesionario;
    this.idVehiculo = data.idVehiculo;
    this.idConcesionario = data.idConcesionario;
    this.marca = data.marca;
    this.submarca = data.submarca;
    this.modelo = data.modelo;
    this.estatusCita = data.estatusCita;
    this.causaValue = data.causa;
    this.piloto = data.piloto;


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
      'Concesionario': [({ value: "", disabled: true })],
      'Taller': [({ value: "", disabled: true })],
      'Domicilio': [({ value: "", disabled: true })],
      'Telefono': [({ value: "", disabled: true })],
      'Contacto': [({ value: "", disabled: true })],
      'Fecha': [({ value: "", disabled: true })],
      'Hora': [({ value: "", disabled: true })],
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

    if(this.causaValue == "Verificacion"){
    this.citaService.getCitaConcesionario(idCita)
      .pipe(first())
      .subscribe(data => {

        this.f.Concesionario.setValue(this.Concesionario);
        this.f.Taller.setValue(data.cita[0].Taller);
        this.f.Domicilio.setValue(data.cita[0].Domicilio + " " + data.cita[0].Colonia + " " + data.cita[0].CP + " " + data.cita[0].Municipio + " " + data.cita[0].EntidadFederativa);
        this.f.Telefono.setValue(data.cita[0].Telefono);
        this.f.Contacto.setValue(data.cita[0].Contacto);
        this.f.Fecha.setValue(data.cita[0].Fecha);
        this.f.Hora.setValue(data.cita[0].Hora);
      },
        error => {
        });
      } else if (this.causaValue == "Instalacion" ) {

        this.citaService.getCitaInstalacion(idCita)
      .pipe(first())
      .subscribe(data => {

        this.f.Concesionario.setValue(this.Concesionario);
        this.f.Taller.setValue(data.citaInstalacion[0].Taller);
        this.f.Domicilio.setValue(data.citaInstalacion[0].Domicilio + " " + data.citaInstalacion[0].Colonia + " " + data.citaInstalacion[0].CP + " " + data.citaInstalacion[0].Municipio + " " + data.citaInstalacion[0].EntidadFederativa);
        this.f.Telefono.setValue(data.citaInstalacion[0].Telefono);
        this.f.Contacto.setValue(data.citaInstalacion[0].Contacto);
        this.f.Fecha.setValue(data.citaInstalacion[0].Fecha);
        this.f.Hora.setValue(data.citaInstalacion[0].Hora);
      },
        error => {
        });

      }
  }

  //Cancela de cita
  cancelarCita() {

    //this.clear();
    if (this.causaValue == "Verificacion") {
      this.citaService.postCancelaCita(this.idVehiculo, this.idCita)
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
    } else if (this.causaValue == "Instalacion") {
      this.citaService.postCancelaCitaInstalacion(this.idVehiculo, this.idCita)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus) {
            this.valorCancel = true;
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

  //Reagenda una cita
  mostrarDialogoReagendar(): void {

          this.dialog.open(DialogoTalleresComponent, {
            data: {idCita: this.idCita, estatusCita: this.estatusCita, nombreConcesionario: this.Concesionario, idConcesionario: this.idConcesionario, idVehiculo: this.idVehiculo, causa: this.causaValue, piloto: this.piloto },
            width: '100%'
          }).afterClosed().subscribe(res => {  
           this.dialogRef.close();        
      
          });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  
}

import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { AlertService } from '../../_alert';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IncidenteService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { DialogoDictamenCitaIncidenteComponent } from '../dialogo-dictamen-cita-incidente/';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dictamen-incidente',
  templateUrl: './dictamen-incidente.component.html',
  styleUrls: ['./dictamen-incidente.component.scss']
})
export class DictamenIncidenteComponent implements OnInit {

  Concesionario: string = "";
  idCita: number = 0;
  reactiveForm!: FormGroup;
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  cancelar: boolean = false;
  dictamen: boolean = false;
  nuevaCita: boolean = false;
  btnVal: string = "CANCELAR Y AGENDAR NUEVA CITA";
  valorCancel: boolean = false;
  Vehiculo            :string = "";
  IdIncidenteSiniestro: number = 0;
  modelo: string = "";
  estatusCita: string = "";
  piloto: boolean = false;

  constructor(
    private incidenteService   :IncidenteService,
    private alertService       :AlertService,
    private formBuilder        :FormBuilder,
    public dialog              :MatDialog,
    public dialogRef           :MatDialogRef<DictamenIncidenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      dialogRef.disableClose = true;
      this.idCita                   = data.idCita;
      this.estatusCita              = data.estatusCita;
      this.Concesionario            = data.Concesionario;
      this.idVehiculo               = data.idVehiculo;
      this.idConcesionario          = data.idConcesionario;
      this.Vehiculo                 = data.Vehiculo;
      this.IdIncidenteSiniestro     = data.IdIncidenteSiniestro;
     }

  ngOnInit(): void {

    this.obtieneCita(this.idCita);

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Concesionario'  :[({ value: "", disabled: true })],
      'Taller'         :[({ value: "", disabled: true })],
      'Domicilio'      :[({ value: "", disabled: true })],
      'Telefono'       :[({ value: "", disabled: true })],
      'Contacto'       :[({ value: "", disabled: true })],
      'Fecha'          :[({ value: "", disabled: true })],
      'Hora'           :[({ value: "", disabled: true })],
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



  

  //Dictaminar una cita
 dictamenCita() {

    const dialogRef = this.dialog.open(DialogoDictamenCitaIncidenteComponent, {
      disableClose: true,
      data: {
        idCita                  :this.idCita, 
        estatusCita             :this.estatusCita, 
        Concesionario           :this.Concesionario, 
        idConcesionario         :this.idConcesionario, 
        idVehiculo              :this.idVehiculo,
        Vehiculo                :this.Vehiculo,
        IdIncidenteSiniestro    :this.IdIncidenteSiniestro
  },
    });

    dialogRef.afterClosed().subscribe(res => {
       
      this.dialogRef.close();
      
    }); 

}

onNoClick(): void {
  this.dialogRef.close();
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


import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { AlertService } from '../../_alert';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CitasService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion';
import { DialogoTalleresComponent } from '../dialogo-talleres';
import { DialogoDictamencitaComponent } from '../dialogo-dictamencita';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dictamen',
  templateUrl: './dictamen.component.html',
  styleUrls: ['./dictamen.component.scss']
})
export class DictamenComponent implements OnInit {

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
  marca: string = "";
  submarca: string = "";
  modelo: string = "";
  estatusCita: string = "";
  piloto: boolean = false;

  constructor(private citaService: CitasService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DictamenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      dialogRef.disableClose = true;
      this.idCita = data.idCita;
      this.Concesionario = data.NombreConcesionario;
      this.idVehiculo = data.idVehiculo;
      this.idConcesionario = data.idConcesionario;
      this.marca = data.marca;
      this.submarca = data.submarca;
      this.modelo = data.modelo;
      this.estatusCita = data.estatusCita;
      this.piloto = data.piloto;
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
    this.clear();

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
  }

  

  //Dictaminar una cita
 dictamenCita() {

    const dialogRef = this.dialog.open(DialogoDictamencitaComponent, {
      disableClose: true,
      data: { idVehiculo: this.idVehiculo, idConcesionario: this.idConcesionario, idCita: this.idCita,
      Concesionario: this.Concesionario, marca: this.marca, submarca: this.submarca, modelo: this.modelo},
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


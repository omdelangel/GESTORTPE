import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Citas } from 'src/app/_models';
import { PilotoService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialogo-confirma-desinstalacion-piloto',
  templateUrl: './dialogo-confirma-desinstalacion-piloto.component.html',
  styleUrls: ['./dialogo-confirma-desinstalacion-piloto.component.scss']
})
export class DialogoConfirmaDesinstalacionPilotoComponent implements OnInit {
  private readonly notifier: NotifierService;

  reactiveForm!: FormGroup;
  idConcesionario: number = 0;
  idVehiculo: number = 0;
  fechaInstalacion: string = "";
  nombreConcesionario: string = "";
  placa: string = "";
  tipoVehiculo: string = "";
  tipoConvertidor: string = "";
  submitted = false;
  citas!: Citas;

  constructor(private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public pilotoService: PilotoService,
    public dialogRef: MatDialogRef<DialogoConfirmaDesinstalacionPilotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier = notifierService; 
      dialogRef.disableClose = true;
      this.idConcesionario = data.IdConcesionario;
      this.nombreConcesionario = data.NombreConcesionario
      this.idVehiculo = data.IdVehiculo;
      this.fechaInstalacion = data.FechaDesinstalacion;
      this.placa = data.Placa;
      this.tipoVehiculo = data.TipoVehiculo;
      this.tipoConvertidor = data.TipoConvertidor;
     }

  ngOnInit(): void {

      //Validaci??n de campos en pantalla
      this.reactiveForm = this.formBuilder.group({
        'Concesionario': [({ value: "", disabled: true })],
        'Placa': [({ value: "", disabled: true })],
        'TipoVehiculo': [({ value: "", disabled: true })],
        'TipoConvertidor': [({ value: "", disabled: true })],
        'FechaInstalacion': ['', Validators.required]
      });

      this.llenaControles();
  }

  get f() { return this.reactiveForm.controls; }

  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }

  confirmaDesinstalacion(){

       //this.clear();
       this.submitted = true;

       // stop here if form is invalid
       if (this.reactiveForm.invalid) {
         return;
       }

  
       this.citas = {
        IdCita: 0, IdConcesionario: this.idConcesionario, IdVehiculo: this.idVehiculo, Fecha: moment(this.f.FechaInstalacion.value).format('YYYY/MM/DD'), IdTaller: 0
       }

   
       this.pilotoService.postConfirmaDesinstalacion(this.citas)
         .pipe(first())
         .subscribe(
           data => {
             if (data.estatus) {         
               //this.success(data.mensaje);             
               this.notifier.notify('success', data.mensaje, '');  
               this.dialogRef.close();  
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

  llenaControles(){

    this.f.Concesionario.setValue(this.nombreConcesionario);
    this.f.TipoConvertidor.setValue(this.tipoConvertidor);
    this.f.TipoVehiculo.setValue(this.tipoVehiculo);
    this.f.Placa.setValue(this.placa); 
    this.f.FechaInstalacion.setValue(moment(this.fechaInstalacion).format('dd/MM/YYYY'));       
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}

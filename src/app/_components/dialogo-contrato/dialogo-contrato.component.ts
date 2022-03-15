import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DocumentosService } from 'src/app/_services';
import { VehiculoContrato } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import { CurrencyPipe } from '@angular/common';  

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialogo-contrato',
  templateUrl: './dialogo-contrato.component.html',
  styleUrls: ['./dialogo-contrato.component.scss']
})
export class DialogoContratoComponent implements OnInit {
  private readonly notifier: NotifierService;

  concesionarioValue: string = "";
  sindicatoValue: string = "";
  reactiveForm!: FormGroup;
  idVehiculoValue: number = 0;
  value: boolean = false;
  tituloContrato: string = "";
  contrato!: VehiculoContrato;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public documentosService: DocumentosService,
    notifierService: NotifierService,
    public currencyPipe: CurrencyPipe,
    public dialogRef: MatDialogRef<DialogoContratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier = notifierService; 
      dialogRef.disableClose = true;
      this.concesionarioValue = data.nombreConcesionario;
      this.idVehiculoValue = data.IdVehiculo;
      this.sindicatoValue = data.sindicato;

      console.log("ENTRA A LA POANTALLE DE CONTRATOS");
      console.log(this.idVehiculoValue);

      this.getContratoVehiculo(this.idVehiculoValue);

     }

  ngOnInit(): void {


    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Concesionario': [({ value: "", disabled: true })],
      'Sindicato': [({ value: "", disabled: true })],
      'TipoConvertidor': [({ value: "", disabled: true })],
      'CostoConvertidor': [({ value: "", disabled: true })],
      'ConsumoMensualLTS': [({ value: "", disabled: true })],
      'Periodo': [({ value: "", disabled: true })],
      'TipoVehiculo': [({ value: "", disabled: true })],
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

  //Consulta los datos del contrato
  getContratoVehiculo(idVehiculo: number) {

    this.documentosService.getVehiculoContrato(idVehiculo)
      .pipe(first())
      .subscribe(data => {

        this.contrato = data.contrato;


        this.f.Concesionario.setValue(this.concesionarioValue);
        this.f.Sindicato.setValue(this.sindicatoValue);
        this.f.TipoConvertidor.setValue(data.contrato[0].Convertidor);
        this.f.CostoConvertidor.setValue(this.currencyPipe.transform(data.contrato[0].ConsumoRequerido));
        this.f.ConsumoMensualLTS.setValue(this.currencyPipe.transform(data.contrato[0].ConsumoMensual));
        this.f.Periodo.setValue(data.contrato[0].NumeroPeriodos);
        this.f.TipoVehiculo.setValue(data.contrato[0].TipoVehiculo);  
      

      },
        error => {
          this.notifier.notify('error', error, '');
        });
  }




  //Genera contrato de membresia
  generarContratoMembresia() {

    console.log("ENTRA A CONTRATO 1");
    this.value = true;
    this.tituloContrato = "Contrato de membresía al programa de beneficios";
}


 //Genera contrato de membresia
 generarContratoSuministro() {

  console.log("ENTRA A CONTRATO 2");
  this.value = true;
  this.tituloContrato = "Contrato de suministro y compra venta a plazos del equipo de conversión";
}

onNoClick(): void {
  this.dialogRef.close();
}

  
}

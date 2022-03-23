import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DocumentosService } from 'src/app/_services';
import { VehiculoContrato } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import { CurrencyPipe } from '@angular/common';  
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

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
  pdfSrc!: string;
  idContrato: number = 0;
  nombreContratoMembresia: string = "";
  nombreContratoSuministro: string = "";

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

        this.idContrato = data.contrato[0].IdContrato;
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

    this.documentosService.getContratoId(this.idContrato)
      .pipe(first())
      .subscribe(data => {

        console.log("data");
        console.log(data);

        this.nombreContratoMembresia = data.archivo;

        console.log("this.nombreContratoMembresia");
        console.log( this.nombreContratoMembresia);

        this.pdfSrc = "./assets/ContratosPDF/" + this.nombreContratoMembresia;
        this.value = true;
        this.tituloContrato = "Contrato de membresía al programa de beneficios";
      
      },
        error => {
          this.notifier.notify('error', error, '');
        });


}


 //Genera contrato de membresia
 generarContratoSuministro() {

  this.documentosService.getContratoId(this.idContrato)
  .pipe(first())
  .subscribe(data => {

    console.log("data");
    console.log(data);

    this.nombreContratoSuministro = data.archivo;

    console.log("this.nombreContratoMembresia");
    console.log( this.nombreContratoSuministro);

    this.pdfSrc = "./assets/ContratosPDF/" + this.nombreContratoSuministro;
    this.value = true;
    this.tituloContrato = "Contrato de suministro y compra venta a plazos del equipo de conversión";
  
  },
    error => {
      this.notifier.notify('error', error, '');
    });


}

onNoClick(): void {
  this.dialogRef.close();
}

  
}

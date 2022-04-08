import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ContratoPiloto } from 'src/app/_models/piloto.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PilotoService, DocumentosService } from 'src/app/_services';
import { CurrencyPipe } from '@angular/common';
import { first } from 'rxjs/operators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialogo-contrato-piloto',
  templateUrl: './dialogo-contrato-piloto.component.html',
  styleUrls: ['./dialogo-contrato-piloto.component.scss']
})
export class DialogoContratoPilotoComponent implements OnInit {
  private readonly notifier: NotifierService;

  concesionarioValue: string = "";
  reactiveForm!: FormGroup;
  value: boolean = false;
  tituloContrato: string = "";
  contrato!: ContratoPiloto;
  pdfSrc!: string;
  idContrato: number = 0;
  nombreContratoMembresia: string = "";
  nombreContratoSuministro: string = "";
  piloto: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public pilotoService: PilotoService,
    notifierService: NotifierService,
    public currencyPipe: CurrencyPipe,
    public documentosService: DocumentosService,
    public dialogRef: MatDialogRef<DialogoContratoPilotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier = notifierService; 
      dialogRef.disableClose = true;
      this.concesionarioValue = data.nombreConcesionario;
      this.piloto = data.piloto;
      this.idContrato = data.idContrato;

      this.getContratoPiloto(this.idContrato);

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
  getContratoPiloto(idContrato: number) {

    this.pilotoService.getContratoPiloto(idContrato)
      .pipe(first())
      .subscribe(data => {

        this.contrato = data.contrato;

        this.idContrato = data.contrato[0].IdContrato;
        this.f.Concesionario.setValue(this.concesionarioValue);
        this.f.Sindicato.setValue(data.contrato[0].Sindicato);
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

        if(data.estatus){

        this.nombreContratoMembresia = data.archivo;
        this.pdfSrc = "./assets/ContratosPDF/" + this.nombreContratoMembresia;
        //this.value = true;
        //this.tituloContrato = "Contrato de membresía al programa de beneficios";

        window.open(this.pdfSrc + '?page=' + 1, '_blank', '');
        } else {

          this.notifier.notify('error', data.mensaje, '');

        }
      
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

    if(data.estatus){

    this.nombreContratoSuministro = data.archivo;
    this.pdfSrc = "./assets/ContratosPDF/" + this.nombreContratoSuministro ;
    //this.value = true;
    //this.tituloContrato = "Contrato de suministro y compra venta a plazos del equipo de conversión";

    window.open(this.pdfSrc + '?page=' + 1, '_blank', '');
    } else {

      this.notifier.notify('error', data.mensaje, '');
    }
  
  },
    error => {
      this.notifier.notify('error', error, '');
    });


}

onNoClick(): void {
  this.dialogRef.close();
}

  
}

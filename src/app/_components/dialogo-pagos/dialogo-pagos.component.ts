import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { AlertService } from '../../_alert';
import { PagosService } from 'src/app/_services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { PagoVentanilla } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface FormaPago {
  idPago: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialogo-pagos',
  templateUrl: './dialogo-pagos.component.html',
  styleUrls: ['./dialogo-pagos.component.scss']
})
export class DialogoPagosComponent implements OnInit {
  private readonly notifier: NotifierService;

  reactiveForm!: FormGroup;
  nombreConcesionario: string = "";
  idContrato: number = 0;
  placa: string = "";
  litrosPendientes: number = 0;
  montoPendiente: number = 0;
  pago: PagoVentanilla;
  matcher = new MyErrorStateMatcher();
  submitted = false;


  //Catálogos locales
  formaPago: FormaPago[] = [
    { idPago: 'E', viewValue: 'Efectivo' },
    { idPago: 'T', viewValue: 'Tarjeta' },
    { idPago: 'R', viewValue: 'Transferencia' }
  ];

  constructor(private pagoVentanilla: PagosService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogoPagosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      dialogRef.disableClose = true;
      this.notifier = notifierService; 
      this.idContrato = data.idContrato;
      this.nombreConcesionario = data.nombreConcesionario;
      this.placa = data.placa;
      this.litrosPendientes = data.litrosPendientes;
      this.montoPendiente = data.montoPendiente;

    }

  ngOnInit(): void {

     //Validación de campos en pantalla
     this.reactiveForm = this.formBuilder.group({
      'Importe': ['', Validators.required],
      'FormaPago':  ['', Validators.required]
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


  pagar(){

    //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }

    this.pago = {
      IdContrato: this.idContrato, Importe: this.f.Importe.value, FormaPago: this.f.FormaPago.value
    }

    this.pagoVentanilla.postPagoVentanilla(this.pago)
    .pipe(first())
    .subscribe(
      data => {   

        if (data.estatus) {
          
          this.dialogRef.close(true);
          //this.success(data.mensaje);
          this.notifier.notify('success', data.mensaje, '');
 
        } else {
          this.dialogRef.close(false);
          //this.warn(data.mensaje);
          this.notifier.notify('warning', data.mensaje, '');
    
        }
      },
      error => {
        //this.error(error);
        this.notifier.notify('error', error, '');
      });
  }

    //Guarda la cita
    mostrarDialogoConfirmacion(): void {     

      //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }

      this.dialog
        .open(DialogoConfirmacionComponent, {
          data: `Se aplicará un pago por: $ ` + this.f.Importe.value + ` al vehículo con número de placa: ` + this.placa, 
          width: '50%'
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
  
           this.pagar();
  
          } else {
  
          }
        });
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


}
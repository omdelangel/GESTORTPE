import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { IncidenteService } from 'src/app/_services';
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
  selector: 'app-dialogo-confirma-arreglo',
  templateUrl: './dialogo-confirma-arreglo.component.html',
  styleUrls: ['./dialogo-confirma-arreglo.component.scss']
})
export class DialogoConfirmaArregloComponent implements OnInit {
  private readonly notifier: NotifierService;

  reactiveForm!: FormGroup;
  idIncidenteSiniestro: string = "";
  idTipoIncidente: string = "";
  concesionario: string = "";
  vehiculo: string = "";
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public incidenteService: IncidenteService,
    public dialogRef: MatDialogRef<DialogoConfirmaArregloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier = notifierService; 
      dialogRef.disableClose = true;
      this.idIncidenteSiniestro = data.IdIncidenteSiniestro;
      this.concesionario = data.Concesionario;
      this.vehiculo = data.Vehiculo;
      this.idTipoIncidente = data.IdTipoSiniestro;
     }

  ngOnInit(): void {

      //Validación de campos en pantalla
      this.reactiveForm = this.formBuilder.group({
        'Concesionario': [({ value: "", disabled: true })],
        'Vehiculo': [({ value: "", disabled: true })],
        'FechaArreglo': ['', Validators.required]
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

  confirmaArreglo(){

       //this.clear();
       this.submitted = true;

       // stop here if form is invalid
       if (this.reactiveForm.invalid) {
         return;
       }

   
       this.incidenteService.postRegistraFechaArreglo(this.idIncidenteSiniestro, moment(this.f.FechaArreglo.value).format('YYYY/MM/DD'), this.idTipoIncidente)
         .pipe(first())
         .subscribe(
           data => {
             if (data.estatus) {                   
               this.notifier.notify('success', data.mensaje, '');  
               this.dialogRef.close();  
             } else {
               this.notifier.notify('warning', data.mensaje, '');
             }
           },
           error => {
             this.notifier.notify('error', error, '');
           });
  }

  llenaControles(){

    this.f.Concesionario.setValue(this.concesionario);
    this.f.Vehiculo.setValue(this.vehiculo);
     
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}

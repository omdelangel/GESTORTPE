import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { AlertService } from '../../_alert';
import { CitasService, CatalogosService } from 'src/app/_services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Dictamen, DictamenCita } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-dialogo-dictamencita',
  templateUrl: './dialogo-dictamencita.component.html',
  styleUrls: ['./dialogo-dictamencita.component.scss']
})
export class DialogoDictamencitaComponent implements OnInit {
  private readonly notifier: NotifierService;


  Concesionario: string = "";
  idCita: number = 0;
  reactiveForm!: FormGroup;
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  marca: string = "";
  submarca: string = "";
  modelo: string = "";
  dictamenes: Dictamen[] = [];
  matcher = new MyErrorStateMatcher();
  submitted = false;
  dictamen!: DictamenCita;
  dictamenValue: string = "";


  constructor(private citaService: CitasService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    notifierService: NotifierService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogoDictamencitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      dialogRef.disableClose = true;
      this.notifier = notifierService; 
      this.idCita = data.idCita;
      this.Concesionario = data.Concesionario;
      this.idVehiculo = data.idVehiculo;
      this.idConcesionario = data.idConcesionario;
      this.marca = data.marca;
      this.submarca = data.submarca;
      this.modelo = data.modelo;

    }

  ngOnInit(): void {

    //this.clear();
    this.getCatalogoDictamen();

     //Validaci??n de campos en pantalla
     this.reactiveForm = this.formBuilder.group({
      'Dictamen': ['', Validators.required],
      'Observaciones':  [''],
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

   //Llena cat??logo de dictamen
   getCatalogoDictamen() {
    this.catalogoService.getCatalogoDictamen()
      .pipe(first())
      .subscribe(data => {

        this.dictamenes = data.dictamenes;
      },
        error => {
        });
  }

  dictaminarCita(){

    //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }

    this.dictamen = {
      IdVehiculo: this.idVehiculo, IdConcesionario: this.idConcesionario, IdCita: this.idCita, IdDictamen: this.f.Dictamen.value, Observaciones: this.f.Observaciones.value
    }

    this.citaService.postDictamenCita(this.dictamen)
    .pipe(first())
    .subscribe(
      data => {

        if (data.estatus) {
          
          //this.success(data.mensaje);
          this.notifier.notify('success', data.mensaje, '');
        } else {
          //this.warn(data.mensaje);
          this.notifier.notify('warnig', data.mensaje, '');
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

    if(this.f.Dictamen.value != "APB" && this.f.Observaciones.value == ""){
      this.notifier.notify('warnig', "Debe ingresar las Observaciones");
      return;
    } 

    switch (this.f.Dictamen.value) {
      case 'APB':
        this.dictamenValue = "Aprobado";
        break;
      case 'RTM':
        this.dictamenValue = "Rechazo temporal";
        break;
      case 'RDF':
        this.dictamenValue = "Rechazo definitivo";
        break;
      case 'SIN':
        this.dictamenValue = "Sin dictamen";
        break;
      default:
        // 
        break;  

  }


      this.dialog
        .open(DialogoConfirmacionComponent, {
          data: `La cita se dictaminar?? como: ` + this.dictamenValue,
          width: '25%'
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
  
           this.dictaminarCita();
           this.dialogRef.close();
  
          } else {
  
          }
        });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { AlertService } from '../../_alert';
import { IncidenteService } from 'src/app/_services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DictamenCitaIncidente } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import { DialogoConfirmacionIncidenteComponent } from '../dialogo-confirmacion-incidente';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Dictamenes {
  IdDictamen       : string;
  viewValue        : string;
}

@Component({
  selector: 'app-dialogo-dictamen-cita-incidente',
  templateUrl: './dialogo-dictamen-cita-incidente.component.html',
  styleUrls: ['./dialogo-dictamen-cita-incidente.component.scss']
})
export class DialogoDictamenCitaIncidenteComponent implements OnInit {
  private readonly notifier: NotifierService;


  Concesionario: string = "";
  idCita: number = 0;
  reactiveForm!: FormGroup;
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  marca: string = "";
  submarca: string = "";
  modelo: string = "";
  ArchivoDictamen    :string;
  //dictamenes: Dictamen[] = [];
  matcher = new MyErrorStateMatcher();
  submitted = false;
  dictamenCitaIncidente!: DictamenCitaIncidente;
  dictamenValue: string = "";
  Vehiculo            :string = "";
  IdIncidenteSiniestro: number = 0;
  estatusCita: string = "";


  dictamenes: Dictamenes[] = [
    { IdDictamen: 'FV', viewValue: 'Falla vehículo' },
    { IdDictamen: 'FC', viewValue: 'Falla Convertidor' },
  ];   

  constructor(
    private incidenteService        :IncidenteService,
    private formBuilder             :FormBuilder,
    notifierService                 :NotifierService,
    public dialog                   :MatDialog,
    public dialogRef                :MatDialogRef<DialogoDictamenCitaIncidenteComponent>,
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

      this.idCita                   = data.idCita;
      this.estatusCita              = data.estatusCita;
      this.Concesionario            = data.Concesionario;
      this.idVehiculo               = data.idVehiculo;
      this.idConcesionario          = data.idConcesionario;
      this.Vehiculo                 = data.Vehiculo;
      this.IdIncidenteSiniestro     = data.IdIncidenteSiniestro;
    }

  ngOnInit(): void {

    //this.clear();
//    this.getCatalogoDictamen();

     //Validación de campos en pantalla
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
/*
   //Llena catálogo de dictamen
   getCatalogoDictamen() {
    this.catalogoService.getCatalogoDictamen()
      .pipe(first())
      .subscribe(data => {

        this.dictamenes = data.dictamenes;
      },
        error => {
        });
  }
*/
  dictaminarCita(){

    //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }
    this.dictamenCitaIncidente = {  
                              IdCita                :this.idCita                  ,  
                              IdIncidenteSiniestro  :this.IdIncidenteSiniestro    ,
                              Dictamen              :this.f.Dictamen.value        ,
                              Observaciones         :this.f.Observaciones.value   ,
                              ArchivoDictamen       :this.ArchivoDictamen        
                              }
                              console.log("dictaminar cita")
                              console.log(this.dictamenCitaIncidente)
                            
    this.incidenteService.postDictamenCitaIncidente(this.dictamenCitaIncidente)
    .pipe(first())
    .subscribe(
      data => {
        console.log("fui dictaminar cita")
        console.log(data)

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
      case 'FV':
        this.dictamenValue = "Falla vehículo";
        break;
      case 'FC':
        this.dictamenValue = "Falla convertidor";
        break;
      default:
        // 
        break;  

  }


      this.dialog
        .open(DialogoConfirmacionIncidenteComponent, {
          data: `La cita se dictaminará como: ` + this.dictamenValue,
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

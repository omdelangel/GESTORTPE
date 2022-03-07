import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { VehiculoService, CatalogosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { Vehiculo, Marcas, Submarcas } from '../../_models';
import { NotifierService } from 'angular-notifier';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Colores {
  IdColor: string;
  viewValue: string;
}

@Component({
  selector: 'app-edicionvehiculo',
  templateUrl: './edicionvehiculo.component.html',
  styleUrls: ['./edicionvehiculo.component.scss']
})
export class EdicionvehiculoComponent implements OnInit {
  private readonly notifier: NotifierService;

  frmStepTwo!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  vehiculo!: Vehiculo;
  idVehiculo: number = 0;
  idPropietario: number = 0;
  idConcesionario: number = 0;
  asigna: boolean = false;
  marcas: Marcas[] = [];
  submarcas: Submarcas[] = [];

  //Catálogos locales
  colores: Colores[] = [
    { IdColor: 'Blanco', viewValue: 'Blanco' },
    { IdColor: 'Rojo', viewValue: 'Rojo' },
    { IdColor: 'Azul', viewValue: 'Azul' },
    { IdColor: 'Negro', viewValue: 'Negro' },
    { IdColor: 'Gris', viewValue: 'Gris' },
    { IdColor: 'Beige', viewValue: 'Beige' },
    { IdColor: 'Plata', viewValue: 'Plata' },
    { IdColor: 'Amarillo', viewValue: 'Amarillo' },

  ];

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private vehiculoService: VehiculoService,
    notifierService: NotifierService,
    private catalogoService: CatalogosService)  { 

      this.notifier = notifierService; 
   
    }

  ngOnInit(): void {

    //this.clear(); 
    this.getCatalogoMarcas();

    //Validación de campos en pantalla
    this.frmStepTwo = this.formBuilder.group({
      'VIN': ['', Validators.required],
      'Marca': ['', Validators.required],
      'Submarca': ['', Validators.required],
      'Modelo': ['', Validators.required],
      'Placa': ['', Validators.required],
      'Color': ['']
    });  
    
  }

  get f() { return this.frmStepTwo.controls; }


  onSubmit() {
    if (this.frmStepTwo.valid) {
      //console.log(this.reactiveForm.value)
    } else {
      return
    }
  }

  //Llena catálogo de Sindicatos
  getCatalogoMarcas() {
    this.catalogoService.getCatalogoMarcas()
      .pipe(first())
      .subscribe(data => {
        this.marcas = data.marcas;
      },
        error => {

        });
  }

  //Evento en cambio de Marca
  onSelectionChanged(value: any) {

    if (value.value == 0) {
      this.frmStepTwo.get('Submarca')?.disable();
    } else {
      this.frmStepTwo.get('Submarca')?.enable();
      this.getCatalogoSubmarcas(value.value);
    }
  }

    //Llena catálogo de Submarcas
    getCatalogoSubmarcas(idMarca: any) {
      this.catalogoService.getCatalogoSubmarcas(idMarca)
        .pipe(first())
        .subscribe(data => {
          this.submarcas = data.submarcas;
        },
          error => {
            this.notifier.notify('error', error, '');
          });
    }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  guardarVehiculo(){  
    //this.clear(); 
    this.submitted = true;

  // stop here if form is invalid
  if (this.frmStepTwo.invalid) {
     return;
  }    

   
    this.vehiculo = {IdVehiculo: this.idVehiculo, IdConcesionario: this.idConcesionario, VIN: this.f.VIN.value, 
    IdSubmarca: this.f.Submarca.value, Modelo: this.f.Modelo.value, Placa: this.f.Placa.value, Color: this.f.Color.value}
  

    this.vehiculoService.postRegistraVehiculo(this.vehiculo)
        .pipe(first())
        .subscribe(
          data => {   
             
            if (data.estatus) {
              this.idVehiculo = data.IdVehiculo;
              this.vehiculoService.sendIdVehiProp(this.idVehiculo, this.idPropietario);
              //this.success(data.mensaje);
              this.notifier.notify('success', data.mensaje, ''); 
            } else  {
              //this.warn(data.mensaje);
              this.notifier.notify('warning', data.mensaje, '');
            }
        },
        error => {
          //this.error(error);
          this.notifier.notify('error', error, '');
        });
    


  // stop here if form is invalid
  if (this.frmStepTwo.invalid) {
     return;
  }    
        
    }

    getVehiculo(idVehiculo: number) {
      //this.clear();
  
      this.vehiculoService.getVehiculo(idVehiculo)
        .pipe(first())
        .subscribe(data => {
  
          this.vehiculo = data.vehiculo;
          this.idPropietario = data.vehiculo[0].IdPropietario;          
          this.f.VIN.setValue(data.vehiculo[0].VIN);
          this.f.Marca.setValue(data.vehiculo[0].IdMarca);
          this.getCatalogoSubmarcas(data.vehiculo[0].IdMarca);
          this.f.Submarca.setValue(data.vehiculo[0].IdSubmarca); 
          this.f.Modelo.setValue(data.vehiculo[0].Modelo);        
          this.f.Placa.setValue(data.vehiculo[0].Placa);
          this.f.Color.setValue(data.vehiculo[0].Color); 

          this.vehiculoService.sendIdVehiProp(this.idVehiculo, this.idPropietario);
        },
          error => {
            this.notifier.notify('error', error, '');
          });
    }


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
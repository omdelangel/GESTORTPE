import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoPerfiles, UsuariosAltaEdicion,  CP, Asentamientos, Identificaciones } from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

//Catálogos locales
interface Estatus {
  Estatus: string;
  viewValue: string;
}

@Component({
  selector: 'app-edicion-usuarios',
  templateUrl: './edicion-usuarios.component.html',
  styleUrls: ['./edicion-usuarios.component.scss']
})


export class EdicionUsuariosComponent implements OnInit {
  private readonly notifier: NotifierService;
  hoyDate : Date = new Date();
  usuario    :UsuariosAltaEdicion;
  todayNumber: number = Date.now();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  IdUsuario        :string;
  Nombre           :string;
  Contrasenia      :string;
  IdEmpleado       :number;
  IdPerfil         :number;
  FechaRegistro    :string;
//  Estatus          :string;
  email            :string;
 // Bloqueado        :boolean;
 // Intentos         :number;
  UltimaTransaccion:string;
  Estatus    :string='A';
  Intentos   :number=0;
  Bloqueado  :boolean=false; 
  frmEditUsr!: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  perfiles: CatalogoPerfiles[] = [];
  idConcesionario: number = 0;
  cp: string = "";
  asentamientos!: CP;
  municipio: string = "";
  entidadFederativa: string = "";
  colonias: Asentamientos[] = [];
  identificaciones: Identificaciones[] = [];
  fechaNacimiento: string = "";
  asigna: boolean = false;
  nombreConcesionario: string = "";
  hide = false;

  estatus: Estatus[] = [
    { Estatus: 'A', viewValue: 'Activo' },
    { Estatus: 'I', viewValue: 'Inactivo' },
  ];
 

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<EdicionUsuariosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    { 

      this.IdUsuario           = data.IdUsuario        ;
      this.Nombre              = data.Nombre           ;
      this.Contrasenia         = data.Contrasenia      ;
      this.IdEmpleado          = data.IdEmpleado       ;
      this.IdPerfil            = data.IdPerfil         ;
      this.FechaRegistro       = data.FechaRegistro    ;
      this.Estatus             = data.Estatus          ;
      this.email               = data.email            ;
      this.Bloqueado           = data.Bloqueado        ;
      this.Intentos            = data.Intentos         ;
      this.UltimaTransaccion   = data.UltimaTransaccion;
     
      this.notifier = notifierService;   
      this.getCatalogoPerfiles();    
    }

  ngOnInit(): void {
    //this.clear();
    //Validación de campos en pantalla
    this.frmEditUsr = this.formBuilder.group({
      'IdUsuario'       : [({ value: "", disabled: true }), Validators.required],
      'Nombre'          : [({ value: "", disabled: true }), Validators.required],
      'IdPerfil'        : ['', Validators.required],
      'Estatus'         : ['', Validators.required],
      'email'           : [({ value: "", disabled: true }), Validators.required],
    }); 
    this.llenaPantalla();
  }

 
  get f() { return this.frmEditUsr.controls; }

  //Consulta los datos del concesionario
  llenaPantalla() {

    this.f.IdUsuario.setValue(this.IdUsuario);                
    this.f.Nombre.setValue(this.Nombre);                
    this.f.Estatus.setValue(this.Estatus);                
    this.f.IdPerfil.setValue(this.IdPerfil);                
    this.f.email.setValue(this.email);                
  }


  onSubmit() {
    if (this.frmEditUsr.valid) {

    } else {
      return
    }
  }

     //Llena catálogo de Perfiles
   getCatalogoPerfiles() {
    this.catalogoService.getCatalogoPerfiles()
      .pipe(first())
      .subscribe(data => {
        this.perfiles   = data.listaDat.perfiles;
        this.llenaPantalla();
      },
        error => {
        });
  }


  //Evento para ocultar y mostrar la pestaña de propietario
  onSelectionAsignacion(value: any) {
    if (value == 6 || value == 3) {
      this.asigna = true;
      this.concesionarioService.sendView(true);
    } else {
      this.asigna = false;
      this.concesionarioService.sendView(false);
    }
  }


  //Acepta sólo el ingreso de números
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  guardarUsuario() {
     
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.frmEditUsr.invalid) {
       return;
     }
 
     this.usuario = {
       IdUsuario          :this.IdUsuario,
       Nombre             :this.f.Nombre.value,
       Contrasenia        :this.Contrasenia,
//       IdEmpleado         :this.IdEmpleado,
       IdEmpleado         :0,
       IdPerfil           :this.f.IdPerfil.value,
       FechaRegistro      :this.FechaRegistro,
       Estatus            :this.f.Estatus.value,
       email              :this.f.email.value,
       Bloqueado          :this.Bloqueado,
       Intentos           :this.Intentos,
       UltimaTransaccion  :this.UltimaTransaccion,
     }
 
     this.catalogoService.postModificaUsuario(this.usuario)
       .pipe(first())
       .subscribe(
         data => {

                 
           if (data.estatus) {
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
 

  onNoClick(): void {
    this.dialogRef.close();
  }

}


import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoPerfiles, UsuariosAltaEdicion,CatalogoSindicatos, CatalogoTpoAsignacion, ConcesionarioAltaEdicion, CP, Asentamientos, Identificaciones } from '../../_models';
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

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.scss']
})


export class AltaUsuariosComponent implements OnInit {
  private readonly notifier: NotifierService;
  hoyDate      : Date = new Date();
  Estatus      :string='A';
  Intentos     :number=0;
  Bloqueado    :boolean=false; 
  frmAltaUsr!  : FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  rfc: string = "";
  nombre: string = "";
  tipo: string = "";
  concesionario!: ConcesionarioAltaEdicion;
  usuario!: UsuariosAltaEdicion;
  sindicatos: CatalogoSindicatos[] = [];
  perfiles: CatalogoPerfiles[] = [];
  asignaciones: CatalogoTpoAsignacion[] = [];
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

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<AltaUsuariosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {

      this.notifier = notifierService;   
     
  }

  ngOnInit(): void {

    this.getCatalogoPerfiles();

    //Validación de campos en pantalla
    this.frmAltaUsr = this.formBuilder.group({
      'IdUsuario'       : ['', Validators.required],
      'Nombre'          : ['', Validators.required],
      'IdPerfil'        : ['', Validators.required],
      'Contrasenia'     : ['', [Validators.required, Validators.min(9) ]],
      'RepContrasenia'  : ['', [Validators.required, Validators.min(9) ]],
      'email'           : ['', [Validators.required, Validators.email]],
    }); 
  }

  get f() { return this.frmAltaUsr.controls; }

  onSubmit() {
    if (this.frmAltaUsr.valid) {

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

      },
        error => {
        });
  }  


  //Valida que las contraseñas sean Iguales 
  validarContrasenia(e: any){
    if (e.target.value != this.f.Contrasenia.value){

      this.notifier.notify('error', "Las contraseñas deben ser iguales", '');
    }
  }

  //Registra el Usuario
  guardarUsuario() {

   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaUsr.invalid) {
      return;
    }

    this.usuario = {
      IdUsuario        :this.f.IdUsuario.value,
      Nombre           :this.f.Nombre.value,
      Contrasenia      :this.f.Contrasenia.value,
      IdEmpleado       :0,
      IdPerfil         :this.f.IdPerfil.value,
      FechaRegistro    :moment(this.hoyDate).format('YYYY-MM-DD'),
      Estatus          :this.Estatus,
      email            :this.f.email.value,
      Bloqueado        :this.Bloqueado,
      Intentos         :this.Intentos,
      UltimaTransaccion:moment(this.hoyDate).format('YYYY-MM-DD'),
    }

    this.catalogoService.postRegistraUsuario(this.usuario)
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


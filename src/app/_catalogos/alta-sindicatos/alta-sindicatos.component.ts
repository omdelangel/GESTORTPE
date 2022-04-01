import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoRegiones, CatalogoTipoConvertidor,CatalogoSindicato,UsuariosAltaEdicion, CatalogoTpoAsignacion, ConcesionarioAltaEdicion, CP, Asentamientos, Identificaciones } from '../../_models';
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
  selector: 'app-alta-sindicatos',
  templateUrl: './alta-sindicatos.component.html',
  styleUrls: ['./alta-sindicatos.component.scss']
})
export class AltaSindicatosComponent implements OnInit {
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
  sindicatos        :CatalogoSindicato[] = [];
  regiones          :CatalogoRegiones[] = [];
  TipoConvertidor   :CatalogoTipoConvertidor[] = [];
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
    public dialogRef: MatDialogRef<AltaSindicatosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {

      this.notifier = notifierService;   
     
  }

  ngOnInit(): void {

    this.getCatalogoRegion();
    this.getCatalogoTipoConv();
    //Validación de campos en pantalla
    this.frmAltaUsr = this.formBuilder.group({
      'IdSindicato'        : ['', Validators.required],
      'Nombre'             : ['', Validators.required],
      'Seccion'            : ['', Validators.required],
      'Responsable'        : ['', Validators.required],
      'Direccion'          : ['', Validators.required],
      'Region'             : ['', Validators.required],
      'TipoConvertidor'    : ['', Validators.required],
      'Estatus'            : ['', Validators.required],

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
   getCatalogoRegion() {
    this.catalogoService.getCatalogoRegiones()
      .pipe(first())
      .subscribe(data => {
        console.log("Catálogo de Regiones")
        console.log(data)
        this.regiones       = data.regionesLista;
        console.log(this.regiones)
      },
        error => {
        });
  }  
  
   //Llena catálogo de Perfiles
   getCatalogoTipoConv() {
    this.catalogoService.getCatalogoTipoConv()
      .pipe(first())
      .subscribe(data => {
        console.log("Catálogo de Tipo Conv")
        console.log(data)
        this.TipoConvertidor   = data.convertidoresLista;
        console.log(this.TipoConvertidor)
      },
        error => {
        });
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
          console.log("Se intentó Alta Usuario")
          console.log(data)
                
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


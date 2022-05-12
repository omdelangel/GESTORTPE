import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { CatalogoEstaciones, CatalogoCobradores, CatalogoTpoAsignacion, ConcesionarioAltaEdicion, CP, Asentamientos, Identificaciones,Entidades, Municipios, } from '../../_models';
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

interface Genero {
    Genero: string;
    viewValue: string;
  }  

interface TipoPersona {
  TipoPersona: string;
  viewValue: string;
}

@Component({
  selector: 'app-alta-cobradores',
  templateUrl: './alta-cobradores.component.html',
  styleUrls: ['./alta-cobradores.component.scss']
})
export class AltaCobradoresComponent implements OnInit {
  private readonly notifier: NotifierService;
  frmAltaCob           !: FormGroup;
  IdEmpleado           :number=0;
  espacios             :string = "";
  entidades            :Entidades[] = [];
  municipios           :Municipios[] = [];
  Estatus              :string='A';
  submitted            = false;
  matcher              = new MyErrorStateMatcher();
  cobradores           !:CatalogoCobradores;
  estaciones           :CatalogoEstaciones[] = [];
  cp                   :string = "";
  asentamientos        !:CP;
  colonias             :Asentamientos[] = [];

  //Catálogos locales
  generos: Genero[] = [
    { Genero: 'M', viewValue: 'Masculino' },
    { Genero: 'F', viewValue: 'Femenino' }
  ];

  tiposPersona: TipoPersona[] = [
    { TipoPersona: 'F', viewValue: 'Física' },
    { TipoPersona: 'M', viewValue: 'Moral' },
  ];

  constructor(
    private formBuilder                :FormBuilder,
    private alertService               :AlertService,
    private catalogoService            :CatalogosService,
    private concesionarioService       :ConcesionarioService,
    notifierService                    :NotifierService,
    public dialogRef                   :MatDialogRef<AltaCobradoresComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {
      this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getCatalogoEstaciones();
    this.getCatalogoEntidades();

    //Validación de campos en pantalla
    this.frmAltaCob = this.formBuilder.group({
        'IdUser'              :['', Validators.required],      
        'Nombre'              :['', Validators.required],
        'Paterno'             :['', Validators.required],
        'Materno'             :['', Validators.required],
        'Contrasenia'         :['', [Validators.required, Validators.min(9) ]],
        'RepContrasenia'      :['', [Validators.required, Validators.min(9) ]],        
        'RFC'                 :['', Validators.required],
        'CURP'                :['', Validators.required],
        'INE'                 :['', Validators.required],
        'FechaNacimiento'     :['', Validators.required],
        'TipoPersona'         :['', Validators.required],
        'Genero'              :['', Validators.required],
        'Domicilio'           :['', Validators.required],
        'IdColonia'           :['', Validators.required],
        'cp'                  :['', Validators.required],
        'IdEntidad'           :[{ value: "", disabled: true }],
        'IdMunicipio'         :[{ value: "", disabled: true }],  
        'Telefono'            :['', Validators.required],
        'email'               :['', [Validators.required, Validators.email]],
        'IdEstacion'          :['', Validators.required],
    }); 

  }

  get f() { return this.frmAltaCob.controls; }

  onSubmit() {
    if (this.frmAltaCob.valid) {

    } else {
      return
    }
  }

   //Llena catálogo de Perfiles
   getCatalogoEstaciones() {
    this.catalogoService.getCatalogoEstaciones()
      .pipe(first())
      .subscribe(data => {
 
        this.estaciones   = data.estacionesLista;

      },
        error => {
        });
  }  

  
  //Llena catálogo de Entidades
  getCatalogoEntidades() {
    this.catalogoService.getCatalogoEntidades()
      .pipe(first())
      .subscribe(data => {
        this.entidades       = data.entidades;

      },
        error => {
        });
    }      

  //Llena catálogo de Municipio
  getCatalogoMunicipios(event: any) {

    this.catalogoService.getCatalogoMunicipios(event.value)
      .pipe(first())
      .subscribe(data => {
        this.municipios       = data.MunicipiossLista;

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
  

  //Acepta sólo el ingreso de números
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  //Obtiene los datos de Municipio, Entidad y Colonia
  changeCP(): void {
    //this.clear();

    this.cp = this.f.cp.value;

    this.catalogoService.getConsultaCP(this.cp)
      .pipe(first())
      .subscribe(
        data => {
  
          if (data.estatus && data.cp != "") {
            this.asentamientos = data.cp;
            this.frmAltaCob.patchValue({
              IdMunicipio    : this.asentamientos.Municipio,
              IdEntidad      : this.asentamientos.EntidadFederativa
            });
            this.colonias = this.asentamientos.asentamientos;
          } else {

            this.frmAltaCob.patchValue({
              IdMunicipio: "",
              IdEntidad: ""
            });
            this.colonias = [];
          }
        },
        error => {
          //this.error(error);
          this.notifier.notify('error', error, '');
        });
  }



  //Registra el Usuario
  guardaCobradores() {

   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaCob.invalid) {
      return;
    }
    
    this.  cobradores = {
          IdEmpleado              :this.IdEmpleado               ,
          Nombre                  :this.f.Nombre.value           ,
          Paterno                 :this.f.Paterno.value          ,
          Materno                 :this.f.Materno.value          ,
          RFC                     :this.f.RFC.value              ,
          CURP                    :this.f.CURP.value             ,
          INE                     :this.f.INE.value              ,
          FechaNacimiento         :moment(this.f.FechaNacimiento.value).format('YYYY-MM-DD'),
          TipoPersona             :this.f.TipoPersona.value      ,
          TPNombre				        :this.espacios                 ,
          Genero                  :this.f.Genero.value           ,
          GNombre		  		        :this.espacios                 ,
          Domicilio               :this.f.Domicilio.value        ,
          Colonia                 :this.f.IdColonia.value        ,
          IdColonia               :this.f.IdColonia.value        ,
          CP                      :this.f.cp.value               ,
          EFNombre				        :this.espacios                 ,
          MNombre					        :this.espacios                 ,
          Telefono                :this.f.Telefono.value         ,
          email                   :this.f.email.value            ,
          IdEstacion              :this.f.IdEstacion.value       ,
          ENombre					        :this.espacios                 ,
          Estatus                 :this.Estatus                  ,
          IdUsuario               :this.f.IdUser.value           ,
          contrasenia             :this.f.Contrasenia.value      ,
          Foto                    :this.espacios                 ,
//      FechaRegistro    :moment(this.hoyDate).format('YYYY-MM-DD'),

    }

    console.log("Guarda Cobradores")
    console.log(this.cobradores)

    this.catalogoService.postRegistraCobradores(this.cobradores)
      .pipe(first())
      .subscribe(
        data => {
                console.log("Data cobradores")
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


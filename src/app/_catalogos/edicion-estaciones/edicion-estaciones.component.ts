import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { CatalogosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogoEstaciones, CP, Asentamientos, CodigosPostales} from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-edicion-estaciones',
  templateUrl: './edicion-estaciones.component.html',
  styleUrls: ['./edicion-estaciones.component.scss']
})
export class EdicionEstacionesComponent implements OnInit {
  private readonly notifier: NotifierService;
  
  frmEditTaller      !: FormGroup;
  submitted          = false;
  matcher            = new MyErrorStateMatcher();
  catalogoEstaciones !: CatalogoEstaciones;
  codigospostales    !: CodigosPostales;
  cp                 : string = "";
  asentamientos      !: CP;
  municipio          : string = "";
  entidadFederativa  : string = "";
  colonias           : Asentamientos[] = [];
  

  IdEstacion         :number;
  Nombre             :string;
  Domicilio          :string;
  IdColonia          :string;
  Telefono					 :string;
  Ubicacion	         :string="";
  Empresa		         :string;
  RFC			           :string;
  Contacto		       :string;
  Region					   :string;
  Estatus					   :string;


  estatus: Estatus[] = [
    { Estatus: 'A', viewValue: 'Activo' },
    { Estatus: 'I', viewValue: 'Inactivo' },
  ];
 

  constructor(
    private formBuilder       : FormBuilder,
    private catalogoService   : CatalogosService,
    notifierService           : NotifierService,
    public dialogRef          : MatDialogRef<EdicionEstacionesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    { 
      console.log("data parametros")
      console.log(data)

      this.IdEstacion        = data.IdEstacion  ;
      this.Nombre            = data.Nombre      ;
      this.Domicilio         = data.Domicilio   ;
      this.IdColonia         = data.IdColonia   ;
      this.Telefono          = data.Telefono    ;
      this.Ubicacion         = data.Ubicacion   ;
      this.Empresa           = data.Empresa     ;
      this.RFC               = data.RFC         ;
      this.Contacto          = data.Contacto    ;
      this.Region            = data.Region      ;
      this.Estatus			     = data.Estatus			;
   
      this.notifier = notifierService;   
//      this.getObtenCP();    
    }

  ngOnInit(): void {
    console.log("Entre al OnInit")
    //this.clear();
    //Validación de campos en pantalla
    this.frmEditTaller = this.formBuilder.group({
      'IdEstacion'          : [({ value: "", disabled: true }), Validators.required],
      'Nombre'              : ['', Validators.required],
      'Domicilio'           : ['', Validators.required],
      'cp'                  : ['', Validators.required],
      'municipio'           : [{ value: "", disabled: true }],
      'entidad'             : [{ value: "", disabled: true }],
      'IdColonia'           : ['', Validators.required],
      'Telefono'            : ['', Validators.required],
      'Empresa'             : ['', Validators.required],
      'RFC'                 : ['', Validators.required],
      'Contacto'            : ['', Validators.required],
      'Region'              : ['', Validators.required],
      'Estatus'             : ['', Validators.required],
    }); 
    this.llenaPantalla();
    this.getObtenCP();    
  }

 
  get f() { return this.frmEditTaller.controls; }

  //Consulta los datos del concesionario
  llenaPantalla() {

    console.log("Datos en llena pantalla")

    this.f.IdEstacion.setValue(this.IdEstacion);
    this.f.Nombre.setValue(this.Nombre);
    this.f.Domicilio.setValue(this.Domicilio);
    this.f.IdColonia.setValue(this.IdColonia);
    this.f.Telefono.setValue(this.Telefono);
    this.f.Empresa.setValue(this.Empresa);
    this.f.RFC.setValue(this.RFC);
    this.f.Contacto.setValue(this.Contacto);
    this.f.Region.setValue(this.Region);
    this.f.Estatus.setValue(this.Estatus);
  }

  onSubmit() {
    if (this.frmEditTaller.valid) {

    } else {
      return
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
  

  //Valida que el nombre no se igual a espacios
  Espacios(e: any) {
    if (e.target.value.trim() == "")
        this.frmEditTaller.patchValue({
        Nombre: ""
        });
        this.notifier.notify('warning', 'Ingresar un nombre valido', '');    
  }

    //Obtiene los datos de Municipio, Entidad y Colonia
    getObtenCP(): void {
  
  //    this.IdColonia = this.f.IdColonia.value;
  
      this.catalogoService.getObtenCP(this.IdColonia)
        .pipe(first())
        .subscribe(
          data => {
            if (data.estatus && data.ColoniasLista != "") {
                this.codigospostales     = data.ColoniasLista[0];
                this.frmEditTaller.patchValue({
                cp:          this.codigospostales.CP   
               });
                this.changeCP();
                this.f.IdColonia.setValue(this.IdColonia);
            } else {
    
              this.frmEditTaller.patchValue({
                cp: "",
              });
            }
          },
          error => {
            //this.error(error);
            this.notifier.notify('error', error, '');
          });
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
            this.frmEditTaller.patchValue({
              municipio: this.asentamientos.Municipio,
              entidad: this.asentamientos.EntidadFederativa
            });
            this.colonias = this.asentamientos.asentamientos;
          } else {
  
            this.frmEditTaller.patchValue({
              municipio: "",
              entidad: ""
            });
            this.colonias = [];
          }
        },
        error => {
          //this.error(error);
          this.notifier.notify('error', error, '');
        });
  }


  guardarEstacion() {
     console.log("Entre a guardar")
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.frmEditTaller.invalid) {
       return;
     }
     console.log("Entre a guardar 1")
     this.catalogoEstaciones = {
      IdEstacion      : this.IdEstacion          ,
      Nombre          : this.f.Nombre.value      ,
      Domicilio       : this.f.Domicilio.value   ,
      IdColonia       : this.f.IdColonia.value   ,
      Telefono        : this.f.Telefono.value    ,
      Ubicacion       : this.Ubicacion           ,
      Empresa         : this.f.Empresa.value     ,
      RFC             : this.f.RFC.value         ,
      Contacto        : this.f.Contacto.value    ,
      Region          : this.f.Region.value      ,
      Estatus		      : this.f.Estatus.value     ,    
     }
 
     console.log("Entre a guardar 2")
     console.log(this.catalogoEstaciones)
     
     this.catalogoService.postModificaEstacion(this.catalogoEstaciones)
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


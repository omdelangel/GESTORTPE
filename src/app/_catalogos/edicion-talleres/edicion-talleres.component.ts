import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { CatalogosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogoTalleres, CP, Asentamientos, CodigosPostales} from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Time } from '@angular/common';

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
  selector: 'app-edicion-talleres',
  templateUrl: './edicion-talleres.component.html',
  styleUrls: ['./edicion-talleres.component.scss']
})
export class EdicionTalleresComponent implements OnInit {
  private readonly notifier: NotifierService;
  
  frmEditTaller      !: FormGroup;
  submitted          = false;
  matcher            = new MyErrorStateMatcher();
  catalogoTalleres   !: CatalogoTalleres;
  codigospostales    !: CodigosPostales;
  cp                 : string = "";
  asentamientos      !: CP;
  municipio          : string = "";
  entidadFederativa  : string = "";
  colonias           : Asentamientos[] = [];
  idTaller           : number = 0;

  IdTaller           :number;
  Nombre             :string;
  RFC                :string;
  Contacto           :string;
  Domicilio	         :string;
  IdColonia          :string;
  Telefono					 :string;
  HorarioIni         :Time;
  HorarioFin		     :Time;
  Concurrencia			 :string;
  DuracionCita		   :Time;
  Estatus					   :string;  
  NombreC            :string;

  estatus: Estatus[] = [
    { Estatus: 'A', viewValue: 'Activo' },
    { Estatus: 'I', viewValue: 'Inactivo' },
  ];
 

  constructor(
    private formBuilder       : FormBuilder,
    private catalogoService   : CatalogosService,
    notifierService           : NotifierService,
    public dialogRef          : MatDialogRef<EdicionTalleresComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    { 
      console.log("data parametros")
      console.log(data)

      this.IdTaller            = data.IdTaller         ;
      this.Nombre              = data.Nombre           ;
      this.RFC                 = data.RFC              ;
      this.Contacto            = data.Contacto         ;
      this.Domicilio           = data.Domicilio        ;
      this.IdColonia           = data.IdColonia        ;
      this.NombreC             = data.NombreC          ;
      this.Telefono            = data.Telefono         ;
      this.HorarioIni          = data.HorarioIni       ;
      this.HorarioFin          = data.HorarioFin       ;
      this.Concurrencia        = data.Concurrencia     ;
      this.DuracionCita        = data.DuracionCita     ;
      this.Estatus			       = data.Estatus          ;
    
      this.notifier = notifierService;   
//      this.getObtenCP();    
    }

  ngOnInit(): void {
    console.log("Entre al OnInit")
    //this.clear();
    //Validación de campos en pantalla
    this.frmEditTaller = this.formBuilder.group({
      'IdTaller'            : [({ value: "", disabled: true }), Validators.required],
      'Nombre'              : ['', Validators.required],
      'RFC'                 : ['', Validators.required],
      'Contacto'            : ['', Validators.required],
      'Domicilio'           : ['', Validators.required],
      'cp'                  : ['', Validators.required],
      'municipio'           : [{ value: "", disabled: true }],
      'entidad'             : [{ value: "", disabled: true }],
      'IdColonia'           : ['', Validators.required],
      'Telefono'            : ['', Validators.required],
      'HorarioIni'          : ['', Validators.required],
      'HorarioFin'          : ['', Validators.required],
      'Concurrencia'        : ['', Validators.required],
      'DuracionCita'        : ['', Validators.required],
      'Estatus'             : ['', Validators.required],
    }); 
    this.llenaPantalla();
    this.getObtenCP();    
  }

 
  get f() { return this.frmEditTaller.controls; }

  //Consulta los datos del concesionario
  llenaPantalla() {

    console.log("Datos en llena pantalla")
    this.f.IdTaller.setValue(this.IdTaller);
    this.f.Nombre.setValue(this.Nombre);
    this.f.RFC.setValue(this.RFC);
    this.f.Contacto.setValue(this.Contacto);
    this.f.Domicilio.setValue(this.Domicilio);
    this.f.IdColonia.setValue(this.IdColonia);
//    this.f.NombreC.setValue(this.NombreC);
    this.f.Telefono.setValue(this.Telefono);
    this.f.HorarioIni.setValue(this.HorarioIni);
    this.f.HorarioFin.setValue(this.HorarioFin);
    this.f.Concurrencia.setValue(this.Concurrencia);
    this.f.DuracionCita.setValue(this.DuracionCita);
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


  guardarTaller() {
     
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.frmEditTaller.invalid) {
       return;
     }
 
     this.catalogoTalleres = {
      IdTaller            : this.IdTaller                 ,
      Nombre              : this.f.Nombre.value           ,
      RFC                 : this.f.RFC.value              ,
      Contacto            : this.f.Contacto.value         ,
      Domicilio           : this.f.Domicilio.value        ,
      IdColonia           : this.f.IdColonia.value        ,
      Telefono            : this.f.Telefono.value         ,
      HorarioIni          : this.f.HorarioIni.value       ,
      HorarioFin          : this.f.HorarioFin.value       ,
      Concurrencia        : this.f.Concurrencia.value     ,
      DuracionCita        : this.f.DuracionCita.value     ,
      Estatus		          : this.f.Estatus.value          ,
     }
 
     this.catalogoService.postModificaTaller(this.catalogoTalleres)
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


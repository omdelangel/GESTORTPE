import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { CatalogosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogoEstaciones, CP, Asentamientos} from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface TiposGas {
  TipoGas        : string;
  viewValue      : string;
}

interface ZonasFronterizas {
  ZF             : number;
  viewValue      : string;
}
@Component({
  selector: 'app-alta-estaciones',
  templateUrl: './alta-estaciones.component.html',
  styleUrls: ['./alta-estaciones.component.scss']
})
export class AltaEstacionesComponent implements OnInit {
  private readonly notifier: NotifierService;
  Estatus                    :string='A';
  frmAltaEstacion            !: FormGroup;
  submitted                  = false;
  matcher                    = new MyErrorStateMatcher();
  catalogoEstaciones         !: CatalogoEstaciones;
  cp                         : string = "";
  asentamientos              !: CP;
  municipio                  : string = "";
  entidadFederativa          : string = "";
  colonias                   : Asentamientos[] = [];
  idEstacion                 : number = 0;
  idUbicacion                : string = ' ';
  Region                     : string = ' ';

  tiposGas: TiposGas[] = [
    { TipoGas: 'GNT', viewValue: 'Gas Natural' },
    { TipoGas: 'GLP', viewValue: 'Gas LP' },
  ];  

  zonasFronterizas: ZonasFronterizas[] = [
    { ZF: 0, viewValue: 'No Fronteriza' },
    { ZF: 1, viewValue: 'Fronteriza' },
  ];  


  constructor(
    private formBuilder       : FormBuilder,
    private catalogoService   : CatalogosService,
    notifierService           : NotifierService,
    public dialogRef          : MatDialogRef<AltaEstacionesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {

      this.notifier = notifierService;   
     
  }

  ngOnInit(): void {

    //Validaci??n de campos en pantalla
    this.frmAltaEstacion = this.formBuilder.group({
      'Nombre'              : ['', Validators.required],
      'Domicilio'           : ['', Validators.required],
      'cp'                  : ['', Validators.required],
      'IdColonia'           : ['', Validators.required],
      'IdEntidad'           : [{ value: "", disabled: true }],
      'IdMunicipio'         : [{ value: "", disabled: true }],
      'Telefono'            : ['', Validators.required],
      'Empresa'             : ['', Validators.required],
      'RFC'                 : ['', Validators.required],
      'Contacto'            : ['', Validators.required],
      'TiposGas'            : ['', Validators.required],
      'ZF'                  : ['', Validators.required],
//      'Region'              : ['', Validators.required],
    }); 
  }

  get f() { return this.frmAltaEstacion.controls; }

  onSubmit() {
    if (this.frmAltaEstacion.valid) {

    } else {
      return
    }
  }

  
  //Acepta s??lo el ingreso de n??meros
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
            this.frmAltaEstacion.patchValue({
              IdMunicipio    : this.asentamientos.Municipio,
              IdEntidad      : this.asentamientos.EntidadFederativa
            });
            this.colonias = this.asentamientos.asentamientos;
          } else {

            this.frmAltaEstacion.patchValue({
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
  guardarEstacion() {

   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaEstacion.invalid) {
      return;
    }

    this.catalogoEstaciones = {
      IdEstacion             : this.idEstacion            ,
      Nombre                 : this.f.Nombre.value        ,
      Domicilio              : this.f.Domicilio.value     ,
      IdColonia              : this.f.IdColonia.value     ,
      Telefono				       : this.f.Telefono.value      ,
      Ubicacion	             : this.idUbicacion           ,
      Empresa		             : this.f.Empresa.value       ,
      RFC			               : this.f.RFC.value           ,
      Contacto		           : this.f.Contacto.value      ,
//      Region					       : this.f.Region.value      ,
      Region					       : this.Region                ,
      Estatus				         : this.Estatus               ,      
      TipoCombustible        : this.f.TiposGas.value      ,
      ZonaFronteriza         : this.f.ZF.value      ,
    }

    this.catalogoService.postRegistraEstaciones(this.catalogoEstaciones)
      .pipe(first())
      .subscribe(
        data => {

                
          if (data.Estatus) {
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



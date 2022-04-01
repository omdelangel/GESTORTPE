import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { CatalogosService } from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogoRegiones, CatalogoTipoConvertidor,CatalogoSindicato} from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  IdSindicato          :number=0;
  Estatus              :string='A';
  frmAltaServ          !:FormGroup;
  submitted            = false;
  catalogoSindicato    :CatalogoSindicato;
  regiones             :CatalogoRegiones[] = [];
  TipoConvertidor      :CatalogoTipoConvertidor[] = [];
  matcher            = new MyErrorStateMatcher();
  

  constructor(
    private formBuilder      :FormBuilder,
    private catalogoService  :CatalogosService,
    notifierService          : NotifierService,

    public dialogRef: MatDialogRef<AltaSindicatosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {
      this.notifier = notifierService;       
  }

  ngOnInit(): void {

    this.getCatalogoRegion();
    this.getCatalogoTipoConv();
    //Validación de campos en pantalla
    this.frmAltaServ = this.formBuilder.group({
      'Nombre'             : ['', Validators.required],
      'Seccion'            : ['', Validators.required],
      'Responsable'        : ['', Validators.required],
      'Direccion'          : ['', Validators.required],
      'Region'             : ['', Validators.required],
      'TipoConvertidor'    : ['', Validators.required],
    }); 
  }

  get f() { return this.frmAltaServ.controls; }

  onSubmit() {
    if (this.frmAltaServ.valid) {
    } else {
      return
    }
  }

  //Llena catálogo de Regiones
  getCatalogoRegion() {
  this.catalogoService.getCatalogoRegiones()
    .pipe(first())
    .subscribe(data => {
      this.regiones       = data.regionesLista;
      console.log(this.regiones)
    },
      error => {
      });
  }  

  //Llena catálogo de Tipo Conv
  getCatalogoTipoConv() {
  this.catalogoService.getCatalogoTipoConv()
    .pipe(first())
    .subscribe(data => {
      this.TipoConvertidor   = data.convertidoresLista;
    },
      error => {
      });
  }    

  //Registra el Usuario
  guardarSindicato() {
    
   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaServ.invalid) {
      return;
    }

    this.catalogoSindicato   = {
      IdSindicato           : this.IdSindicato                   ,
      Nombre                : this.f.Nombre.value                ,
      Seccion               : this.f.Seccion.value               ,
      Responsable           : this.f.Responsable.value           ,
      Direccion             : this.f.Direccion.value             ,
      IdRegion              : this.f.Region.value                ,
      IdTipoConvertidor     : this.f.TipoConvertidor.value       ,
      Estatus               : this.Estatus                       ,
    }

    this.catalogoService.postRegistraSindicato(this.catalogoSindicato)
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


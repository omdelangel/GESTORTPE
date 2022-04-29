import { Component, OnInit, Inject, Optional, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService, ConcesionarioService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { PromocionesSindicato } from '../../_models/piloto.model';
import { CatalogoSindicatos, CatalogoTpoAsignacion, ConcesionarioAltaEdicion, CP, Asentamientos, Identificaciones } from '../../_models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import { PilotoService } from '../../_services/piloto.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-alta-empresa-piloto',
  templateUrl: './alta-empresa-piloto.component.html',
  styleUrls: ['./alta-empresa-piloto.component.scss']
})
export class AltaEmpresaPilotoComponent implements OnInit {
  private readonly notifier: NotifierService;
  IdPromocion     :number=1;
  sindicatos      :CatalogoSindicatos[] = [];
  Duracion        :number=30;
  Litros          :number=0.00;
  frmAltaEP       !: FormGroup;
  submitted       = false;
  promocionessindicato!: PromocionesSindicato;
  matcher         = new MyErrorStateMatcher();

  constructor(
    private formBuilder          :FormBuilder,
    private pilotoService        :PilotoService,
    private catalogoService      :CatalogosService,
    notifierService              :NotifierService,
    public dialogRef             :MatDialogRef<AltaEmpresaPilotoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {

      this.notifier = notifierService;   
     
  }

  ngOnInit(): void {

    this.getCatalogoSindicatos();

    //Validación de campos en pantalla
    this.frmAltaEP = this.formBuilder.group({
      'IdPromocion'         : [{ value: "Piloto", disabled: true }],
      'Sindicato'           : ['', Validators.required],
      'FechaInicio'         : ['', Validators.required],
      'FechaTermino'        : ['', Validators.required],
      'Duracion'            : [{ value: "30 días", disabled: true }],
    }); 
  }

  get f() { return this.frmAltaEP.controls; }

  onSubmit() {
    if (this.frmAltaEP.valid) {

    } else {
      return
    }
  }

  getCatalogoSindicatos() {
    this.catalogoService.getCatalogoSindicatos()
      .pipe(first())
      .subscribe(data => {
        this.sindicatos = data.sindicatos;
      },
        error => {

        });
  }


  //Registra el Usuario
  guardarEmpresaPiloto() {

   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaEP.invalid) {
      return;
    }

    this.promocionessindicato = {
      IdPromocion      :this.IdPromocion                                        ,
      IdSindicato      :this.f.Sindicato.value                                  ,
      FechaInicio      :moment(this.f.FechaInicio.value).format('YYYY-MM-DD')   ,
      FechaTermino     :moment(this.f.FechaTermino.value).format('YYYY-MM-DD')  ,
      Duracion         :this.Duracion                                           ,
      Litros           :this.Litros                                             ,  
    }

    this.pilotoService.postRegistraPromocionesSindicato(this.promocionessindicato)
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



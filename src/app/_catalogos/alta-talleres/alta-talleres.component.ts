import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { CatalogosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogoTalleres, CP, Asentamientos} from '../../_models';
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
  selector: 'app-alta-talleres',
  templateUrl: './alta-talleres.component.html',
  styleUrls: ['./alta-talleres.component.scss']
})
export class AltaTalleresComponent implements OnInit {
  private readonly notifier: NotifierService;
  Estatus            :string='A';
  frmAltaTaller      !: FormGroup;
  submitted          = false;
  matcher            = new MyErrorStateMatcher();
  catalogoTalleres   !: CatalogoTalleres;
  cp                 : string = "";
  asentamientos      !: CP;
  municipio          : string = "";
  entidadFederativa  : string = "";
  colonias           : Asentamientos[] = [];
  idTaller           : number = 0;


  constructor(
    private formBuilder       : FormBuilder,
    private catalogoService   : CatalogosService,
    notifierService           : NotifierService,
    public dialogRef          : MatDialogRef<AltaTalleresComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)   
    {

      this.notifier = notifierService;   
     
  }

  ngOnInit(): void {

    //Validación de campos en pantalla
    this.frmAltaTaller = this.formBuilder.group({
      'Nombre'              : ['', Validators.required],
      'RFC'                 : ['', Validators.required],
      'Contacto'            : ['', Validators.required],
      'Domicilio'           : ['', Validators.required],
      'cp'                  : ['', Validators.required],
      'IdColonia'           : ['', Validators.required],
      'Telefono'            : ['', Validators.required],
      'HorarioIni'          : ['', Validators.required],
      'HorarioFin'          : ['', Validators.required],
      'Concurrencia'        : ['', Validators.required],
      'DuracionCita'        : ['', Validators.required],
    }); 
  }

  get f() { return this.frmAltaTaller.controls; }

  onSubmit() {
    if (this.frmAltaTaller.valid) {

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

  //valida la Hora Fin
  changeHF(): void{
    if (this.f.HorarioIni.value >= this.f.HorarioFin.value) {
      this.frmAltaTaller.patchValue({
        HorarioFin: ""
      });
      this.notifier.notify('warning', 'Hora Fin debe ser Mayor a Hora Ini', '');
    }
  }

  changeDuracion():void{ 
    let inicioMinutos        = parseInt(this.f.HorarioIni.value.substr(3,2));
    let inicioHoras          = parseInt(this.f.HorarioIni.value.substr(0,2));
    
    let finMinutos           = parseInt(this.f.HorarioFin.value.substr(3,2));
    let finHoras             = parseInt(this.f.HorarioFin.value.substr(0,2));

    let DurMinutos           = parseInt(this.f.DuracionCita.value.substr(3,2));
    let DurHoras             = parseInt(this.f.DuracionCita.value.substr(0,2));

    let transcurridoMinutos  = finMinutos - inicioMinutos;
    let transcurridoHoras    = finHoras - inicioHoras;
    
    if (transcurridoMinutos < 0) {
        transcurridoHoras--;
      transcurridoMinutos = 60 + transcurridoMinutos;
    }
    
    if (transcurridoHoras == DurHoras ) {
        if (transcurridoMinutos < DurMinutos ){
            this.frmAltaTaller.patchValue({
            DuracionCita: ""
            });
        this.notifier.notify('warning', 'Hora Ini + Duración debe ser Menor a Hora Fin', '');
           }
      }
    
    if (transcurridoHoras < DurHoras ){
        this.frmAltaTaller.patchValue({
        DuracionCita: ""
       });
       this.notifier.notify('warning', 'Hora Ini + Duración debe ser Menor a Hora Fin', '');
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
            this.frmAltaTaller.patchValue({
              municipio: this.asentamientos.Municipio,
              entidad: this.asentamientos.EntidadFederativa
            });
            this.colonias = this.asentamientos.asentamientos;
          } else {
  
            this.frmAltaTaller.patchValue({
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


  //Registra el Usuario
  guardarTaller() {
   //this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.frmAltaTaller.invalid) {

      return;
    }

    this.catalogoTalleres = {
      IdTaller              :this.idTaller,
      Nombre                :this.f.Nombre.value,
      RFC                   :this.f.RFC.value, 
      Contacto              :this.f.Contacto.value,
      Domicilio             :this.f.Domicilio.value, 
      IdColonia             :this.f.IdColonia.value, 
      Telefono              :this.f.Telefono.value,
      HorarioIni            :this.f.HorarioIni.value,
      HorarioFin            :this.f.HorarioFin.value,
      Concurrencia          :this.f.Concurrencia.value,
      DuracionCita          :this.f.DuracionCita.value,
      Estatus               :this.Estatus, 
    }

    this.catalogoService.postRegistraTaller(this.catalogoTalleres)
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


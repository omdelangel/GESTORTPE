import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { CatalogosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { Marca, Submarca} from '../../_models';
import { NotifierService } from 'angular-notifier';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface TipoVehiculo {
  TipoVehiculo    : string;
  viewValue       : string;
}



@Component({
  selector: 'app-edicion-marca-submarca',
  templateUrl: './edicion-marca-submarca.component.html',
  styleUrls: ['./edicion-marca-submarca.component.scss']
})
export class EdicionMarcaSubmarcaComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['Nombre', 'TipoVehiculo', 'Estatus', 'actions']
  dataSource!: MatTableDataSource<Submarca>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm         !: FormGroup;
  marca                 :Marca;
  submarca              :Submarca;
  submarcas             :Submarca[] = [];
  IdSubmarca            :number = 0;
  IdMarca               :number = 0;
  BanderaMarca          :boolean = true;
  BanderaGrabar         :boolean = true;
  Estatus               :number = 0;
  submitted             = false;
  matcher               = new MyErrorStateMatcher();
  Nombre                : string = "";
  condition: boolean = false;


  //Cat??logos locales
  tiposVehiculo: TipoVehiculo[] = [
    { TipoVehiculo: 'A', viewValue: 'Taxi' },
    { TipoVehiculo: 'V', viewValue: 'Vans' },
    { TipoVehiculo: 'S', viewValue: 'Suburbano' },
  ];


  constructor(
    private formBuilder        :FormBuilder,
    private catalogoService    :CatalogosService,
    notifierService            :NotifierService,
    public dialogRef           :MatDialogRef<EdicionMarcaSubmarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.notifier              = notifierService;
    this.IdMarca               = data.IdMarca;
    this.Nombre                = data.Nombre;
     this.getConsultasubmarcas(this.IdMarca);

  }

  ngOnInit(): void {

    //Validaci??n de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Marca'           : [{ value: "", disabled: true }],
      'Submarca'        : ['', Validators.required],
      'TipoVehiculo'    : ['', Validators.required],
    });

  }

  get f() { return this.reactiveForm.controls; }


  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)
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

  //Registro de submarca
  guardasubmarca() {

    this.submitted = true;

    if (this.f.TipoVehiculo.value == 0){
        this.BanderaGrabar = false
    }else{
        this.BanderaGrabar = true
    }

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }

    if (this.BanderaGrabar){
    this.submarca = {
                      IdSubmarca       :this.IdSubmarca, 
                      IdMarca          :this.IdMarca,
                      Nombre           :this.f.Submarca.value, 
                      TipoVehiculo     :this.f.TipoVehiculo.value,
                      Estatus          :this.Estatus,
                    }

    this.catalogoService.postModificaSubmarca(this.submarca)
      .pipe(first())
      .subscribe(
        data => {
      
          if (data.estatus) {
            this.getConsultasubmarcas(this.IdMarca);
            this.IdSubmarca   = 0
            this.f.Submarca.setValue("");
            this.f.TipoVehiculo.setValue(0);
            this.IdSubmarca      = 0
//            this.f.Submarca.focus();
            this.notifier.notify('success', data.mensaje, '');
          } else {
            this.getConsultasubmarcas(this.IdMarca);
            this.notifier.notify('warning', data.mensaje, '');
          }
        },
        error => {
          this.notifier.notify('error', error, '');
        });

  }else{
    this.notifier.notify('warning', 'Es necesario capturar Tipo de Veh??culo', '');
  }
}


//cambiar valor de Estatus
  changeEstatus(e: any){
    if (e.Estatus == "A") {
      e.Estatus = 1;
    } else if (e.Estatus == "I") {
      e.Estatus = 0;
    }
    //e.Estatus = !e.Estatus;
    this.catalogoService.postModificaSubmarca(e)
      .pipe(first())
      .subscribe(data => {   
        this.getConsultasubmarcas(this.IdMarca);
        this.IdSubmarca      = 0
      },
        error => {  
        });
  }


  guardamarca() {
    this.submitted      = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }

    if (this.BanderaMarca){
        this.marca = {
                      IdMarca          :this.IdMarca,
                      Nombre           :this.f.Marca.value, 
                      Estatus          :this.Estatus,
                      }

        this.catalogoService.postRegistraMarca(this.marca)
          .pipe(first())
          .subscribe(
            data => {

              if (data.estatus) {
                  this.BanderaMarca   = false;
                  this.IdMarca        = data.contenido;
                  this.guardasubmarca();
//                  this.f.Submarca.setValue("");
//                  this.f.TipoVehiculo.setValue(0);
//                  this.notifier.notify('success', data.mensaje, '');
              } else {
                  this.getConsultasubmarcas(this.IdMarca);
                  this.notifier.notify('warning', data.mensaje, '');
              }
            },
            error => {
              this.notifier.notify('error', error, '');
            });
          }else{
            this.guardasubmarca();
          }
  }


  //Cierra la pantalla
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Recupera los datos del registro para la edici??n del submarca
  editar(e: any) {

    this.BanderaMarca    = false;
    this.condition       = false;
    this.IdSubmarca      = e.IdSubmarca;
    this.f.Marca.setValue(this.Nombre);
    this.f.Submarca.setValue(e.Nombre);
    this.f.TipoVehiculo.setValue(e.TipoVehiculo);
   

  }


  //Consulta los submarcas
  getConsultasubmarcas(marca: number) {
//getCatalogoMarca
//    this.operadorService.getOperadorVehiculo(placa)

    this.catalogoService.getCatalogoSubmarca(marca)
      .pipe(first())
      .subscribe(data => {

        if (data.estatus == true && data.SubMarcasLista != "") {
      
          // Assign the data to the data source for the table to render
          this.submarcas = data.SubMarcasLista;
          this.dataSource = new MatTableDataSource(this.submarcas);
          //this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";


        } else if (data.estatus == false) {

          //var elemTable = document.getElementById('htmlData');
          //elemTable!.style.visibility = "hidden";

          this.notifier.notify('warning', data.mensaje);

        } else if (data.estatus == true && data.submarcas == "") {

          //var elemTable = document.getElementById('htmlData');
          //elemTable!.style.visibility = "hidden";

          this.notifier.notify('warning', data.mensaje);

//          this.idConcesionario = data.IdConcesionario;
  //        this.idVehiculo = data.IdVehiculo;
          //this.openDialog();


        }


      },
        error => {
          this.notifier.notify('success', error);

        });

  }
}


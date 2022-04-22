import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConcesionarioInstalacion, CatalogoSindicatos } from '../../_models';
import { ConcesionarioService, CatalogosService} from 'src/app/_services';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DialogoOperadorAltaComponent } from '../dialogo-operador-alta';
import { DialogoTalleresComponent } from '../dialogo-talleres';
import { EdicionCitaComponent } from '../edicion-cita';
import { DialogoConfirmaInstalacionComponent } from '../dialogo-confirma-instalacion';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formalizacion',
  templateUrl: './formalizacion.component.html',
  styleUrls: ['./formalizacion.component.scss']
})
export class FormalizacionComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreConcesionario', 'FechaRegistro', 'Marca', 'SubMarca', 'Modelo', 'Placa', 
  'TipoVehiculo', 'TipoConvertidor', 'FechaCitaInstalacion', 'EstatusCitaInstalacion', 'actions'];
  dataSource!: MatTableDataSource<ConcesionarioInstalacion>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  reactiveForm!: FormGroup;
  formalizacion: ConcesionarioInstalacion[] = [];
  sindicatos: CatalogoSindicatos[] = [];
  matcher = new MyErrorStateMatcher();
  submitted = false;

  constructor(public dialog: MatDialog,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    ) { 

      this.notifier = notifierService;   
    }

  ngOnInit(): void {

    //this.getConsultaFormalizacion();
    this.getCatalogoSindicatos(); 

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'sindicato': ['', Validators.required]
    });    

  }

  get g() { return this.reactiveForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
     return;
   } else {
     this.getConsultaFormalizacion(this.g.sindicato.value);
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


    //Consulta los datos de concesionarios aprobados
    getConsultaFormalizacion(idEmpresa: number){


      this.concesionarioService.getConcesionarioInstalacion(idEmpresa)
        .pipe(first())
        .subscribe(data => {   

          if (data.estatus ) {
 
          this.formalizacion = data.concesionario;   
          this.dataSource = new MatTableDataSource(this.formalizacion);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
          } else {

            this.notifier.notify('warning', data.mensaje)

            var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
        
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";

          }
              
 
        },
          error => {

            this.notifier.notify('error', error);

            var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
        
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";
  
          });

    }


    public handlePage(e: any) {

    }


    //Mantenimiento a operadores
    operadores(e: any) {

      const dialogRef = this.dialog.open(DialogoOperadorAltaComponent, {
        data: { Placa: e.Placa},
        disableClose: true,
        width: '1500px',
        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaFormalizacion(this.g.sindicato.value);
      });

    }

      //Registro de Citas para la instalacion
      cita(e: any) {

        if(e.IdCitaInstalacion == null  || e.EstatusCitaInstalacion == "D" || e.EstatusCitaInstalacion == "V" || e.EstatusCitaInstalacion == "C"){

          const dialogRef = this.dialog.open(DialogoTalleresComponent, {
            disableClose: true,
            data: {idCita: e.IdCitaInstalacion, estatusCita: e.EstatusCitaInstalacion, nombreConcesionario: e.NombreConcesionario, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo, causa: "Instalacion", piloto: e.Piloto},
            
          });
      
          dialogRef.afterClosed().subscribe(res => {
            this.getConsultaFormalizacion(this.g.sindicato.value);
          });


        } else {
        
        const dialogRef = this.dialog.open(EdicionCitaComponent, {
          disableClose: true,
          data: { idCita: e.IdCitaInstalacion, NombreConcesionario: e.NombreConcesionario, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo,
          marca: e.Marca, submarca: e.Submarca, modelo: e.Modelo, estatusCita: e.EstatusCitaInstalacion, causa: "Instalacion" , piloto: e.Piloto},
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaFormalizacion(this.g.sindicato.value);
        });

      }
  
      }

     //Confirma la instalacion del convertidor
     confirmacion(e: any) {

      const dialogRef = this.dialog.open(DialogoConfirmaInstalacionComponent, {
        data: { IdVehiculo: e.IdVehiculo, IdConcesionario: e.IdConcesionario, NombreConcesionario: e.NombreConcesionario, Placa: e.Placa,
        TipoVehiculo: e.TipoVehiculo, TipoConvertidor: e.TipoConvertidor, FechaInstalacion: e.FechaCitaInstalacion, piloto: e.Piloto},
        disableClose: true,
        //width: '1500px',
       // height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaFormalizacion(this.g.sindicato.value);
      });

    }
 

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
  
}
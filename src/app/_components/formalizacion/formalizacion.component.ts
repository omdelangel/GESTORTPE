import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConcesionarioInstalacion } from '../../_models';
import { ConcesionarioService } from 'src/app/_services';
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

  constructor(public dialog: MatDialog,
    private concesionarioService: ConcesionarioService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    ) { 

      this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaFormalizacion();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdConcesionario': [''],
      'NombreConcesionario':[''],
      'FechaRegistro':[''],
      'IdVehiculo': [''],
      'Marca':[''],
      'Submarca':[''],
      'Modelo':[''],
      'Placa': [''],
      'TipoVehiculo':[''],
      'TipoConvertidor':[''],
      'FechaCitaInstalacion':[''],
      'EstatusCitaInstalacion':[''],
      'ConfirmaCita':[''],
    });    

  }

  get g() { return this.reactiveForm.controls; }

  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)
    } else {
      return
    }
  }



    //Consulta los datos de concesionarios aprobados
    getConsultaFormalizacion(){


      this.concesionarioService.getConcesionarioInstalacion()
        .pipe(first())
        .subscribe(data => {   
 
          this.formalizacion = data.concesionario;   
          this.dataSource = new MatTableDataSource(this.formalizacion);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
              
 
        },
          error => {
  
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
        this.getConsultaFormalizacion();
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
            this.getConsultaFormalizacion();
          });


        } else {
        
        const dialogRef = this.dialog.open(EdicionCitaComponent, {
          disableClose: true,
          data: { idCita: e.IdCitaInstalacion, NombreConcesionario: e.NombreConcesionario, idConcesionario: e.IdConcesionario, idVehiculo: e.IdVehiculo,
          marca: e.Marca, submarca: e.Submarca, modelo: e.Modelo, estatusCita: e.EstatusCitaInstalacion, causa: "Instalacion" , piloto: e.Piloto},
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaFormalizacion();
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
        this.getConsultaFormalizacion();
      });

    }
 

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
  
}
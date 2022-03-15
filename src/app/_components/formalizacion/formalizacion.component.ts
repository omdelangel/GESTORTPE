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
import { OperadoresComponent } from '../operadores';
import { DialogoOperadorAltaComponent } from '../dialogo-operador-alta';

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
  displayedColumns = ['IdConcesionario', 'NombreConcesionario', 'FechaRegistro', 'Marca', 'SubMarca', 'Modelo', 'Placa', 
  'TipoVehiculo', 'TipoConvertidor', 'FechaCitaInstalacion', 'EstatusCitaInstalacion', 'ConfirmaCita', 'actions'];
  dataSource!: MatTableDataSource<ConcesionarioInstalacion>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  reactiveForm!: FormGroup;
  formalizacion: ConcesionarioInstalacion[] = [];

  constructor(public dialog: MatDialog,
    private concesionarioService: ConcesionarioService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) { 

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


    //Edita el concesionario/preregistro
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

     //Edita el concesionario/preregistro
     cita(e: any) {

      const dialogRef = this.dialog.open(OperadoresComponent, {
        data: { IdVehiculo: e.IdVehiculo, nombreConcesionario: e.NombreConcesionario, sindicato: e.Sindicato},
        disableClose: true,
        width: '1500px',
        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaFormalizacion();
      });

    }

     //Edita el concesionario/preregistro
     confirmacion(e: any) {

      const dialogRef = this.dialog.open(OperadoresComponent, {
        data: { IdVehiculo: e.IdVehiculo, nombreConcesionario: e.NombreConcesionario, sindicato: e.Sindicato},
        disableClose: true,
        width: '1500px',
        height: '900px'
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
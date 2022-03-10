import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm , Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { OperadorService } from 'src/app/_services';
import { DialogoOperadorComponent } from '../dialogo-operador';
import { Operador } from 'src/app/_models';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.scss']
})
export class OperadoresComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreConcesionario', 'FechaRegistro', 'Marca', 'SubMarca', 'Modelo', 'Placa', 
  'Estatus', 'Sindicato', 'actions'];
  dataSource!: MatTableDataSource<Operador>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm!: FormGroup;
  consulta: Operador[] = [];

  constructor(public dialog: MatDialog,
    private operadorService: OperadorService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) { }

  ngOnInit(): void {

    this.getConsultaOperadores();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'placa': ['', Validators.required],
      'IdConcesionario': [''],
      'NombreConcesionario':[''],
      'FechaRegistro':[''],
      'IdVehiculo': [''],
      'Marca':[''],
      'Submarca':[''],
      'Modelo':[''],
      'Placa': [''],
      'Estatus':[''],
      'IdSindicato':[''],
      'Sindicato':[''],
      'IdAsignacionSindicato':[''],
      'EditaContrato':[''],
      'EditaDocumentos':[''],
      'EditaOperador':[''],
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


      //Abre modal para alta de los operadores
      openDialog(): void {
        const dialogRef = this.dialog.open(DialogoOperadorComponent, {
          disableClose: true,
          width: '1500px',
          height: '900px'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaOperadores();
        });
      }


      //Consulta los operadores
      getConsultaOperadores(){

        this.operadorService.getOperadorVehiculo("placa")
        .pipe(first())
        .subscribe(data => {   
 
          this.consulta = data.operador;   
          this.dataSource = new MatTableDataSource(this.consulta);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
              
 
        },
          error => {
  
          });

      }

      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
 
}

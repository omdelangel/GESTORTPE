import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConcesionarioRegistro } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConcesionarioService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogoContratoComponent } from '../dialogo-contrato';
import { DialogoDocumentosRegistroComponent } from '../dialogo-documentos-registro';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-consulta-registro',
  templateUrl: './consulta-registro.component.html',
  styleUrls: ['./consulta-registro.component.scss']
})
export class ConsultaRegistroComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreConcesionario', 'FechaRegistro', 'Marca', 'SubMarca', 'Modelo', 'Placa', 
  'Estatus', 'Sindicato', 'actions'];
  dataSource!: MatTableDataSource<ConcesionarioRegistro>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  reactiveForm!: FormGroup;
  registro: ConcesionarioRegistro[] = [];

  constructor(public dialog: MatDialog,
    private concesionarioService: ConcesionarioService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) { 

      this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaRegistro();

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



    //Consulta los datos de concesionarios aprobados
    getConsultaRegistro(){
      //this.clear();


      this.concesionarioService.getRegistroConcesionario()
        .pipe(first())
        .subscribe(data => {   
 
          this.registro = data.concesionario;   
          this.dataSource = new MatTableDataSource(this.registro);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
              
 
        },
          error => {
  
          });

    }


    public handlePage(e: any) {

    }


    //Edita el concesionario/preregistro
    contrato(e: any) {

      const dialogRef = this.dialog.open(DialogoContratoComponent, {
        data: { IdVehiculo: e.IdVehiculo, nombreConcesionario: e.NombreConcesionario, sindicato: e.Sindicato},
        disableClose: true,
        //width: '1500px',
        //height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaRegistro();
      });

    }



     //Edita los documentos
     documentos(e: any) {

      const dialogRef = this.dialog.open(DialogoDocumentosRegistroComponent, {
        disableClose: true,
        data: { IdVehiculo: e.IdVehiculo, IdConcesionario: e.IdConcesionario, nombreConcesionario: e.NombreConcesionario, marca: e.Marca,
        submarca: e.Submarca, modelo: e.Modelo},
        width: '1500px',
        //height: '700px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaRegistro();
      });

    }
     

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
  
}


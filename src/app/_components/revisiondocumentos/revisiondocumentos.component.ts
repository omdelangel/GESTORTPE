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
  selector: 'app-revisiondocumentos',
  templateUrl: './revisiondocumentos.component.html',
  styleUrls: ['./revisiondocumentos.component.scss']
})
export class RevisiondocumentosComponent implements OnInit {

  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreConcesionario', 'FechaRegistro', 'Marca', 'SubMarca', 'Modelo', 'Placa',
    'Estatus', 'Sindicato', 'actions'];
  dataSource!: MatTableDataSource<ConcesionarioRegistro>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  reactiveForm!: FormGroup;
  verifica: ConcesionarioRegistro[] = [];

  constructor(public dialog: MatDialog,
    private concesionarioService: ConcesionarioService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) {

    this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.getConsultaDocumentosVerifica();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdConcesionario': [''],
      'NombreConcesionario': [''],
      'FechaRegistro': [''],
      'IdVehiculo': [''],
      'Marca': [''],
      'Submarca': [''],
      'Modelo': [''],
      'Placa': [''],
      'Estatus': [''],
      'IdSindicato': [''],
      'Sindicato': [''],
      'IdAsignacionSindicato': [''],
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
  getConsultaDocumentosVerifica() {

    this.concesionarioService.getConcesionarioVerifica()
      .pipe(first())
      .subscribe(data => {

        this.verifica = data.concesionario;
        this.dataSource = new MatTableDataSource(this.verifica);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
        error => {

        });

  }


  public handlePage(e: any) {

  }


  //Edita los documentos
  documentos(e: any) {

    const dialogRef = this.dialog.open(DialogoDocumentosRegistroComponent, {
      disableClose: true,
      data: {
        IdVehiculo: e.IdVehiculo, IdConcesionario: e.IdConcesionario, nombreConcesionario: e.NombreConcesionario, marca: e.Marca,
        submarca: e.Submarca, modelo: e.Modelo, piloto: e.Piloto
      },
      width: '1500px',
      //height: '700px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaDocumentosVerifica();
    });

  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
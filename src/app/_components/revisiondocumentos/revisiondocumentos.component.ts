import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm , Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConcesionarioRegistro, CatalogoSindicatos } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConcesionarioService, CatalogosService } from '../../_services';
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
  sindicatos: CatalogoSindicatos[] = [];
  matcher = new MyErrorStateMatcher();
  submitted = false;

  constructor(public dialog: MatDialog,
    private catalogoService: CatalogosService,
    private concesionarioService: ConcesionarioService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) {

    this.notifier = notifierService;
  }

  ngOnInit(): void {

    //this.getConsultaDocumentosVerifica();
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
     this.getConsultaDocumentosVerifica(this.g.sindicato.value);
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
  getConsultaDocumentosVerifica(idEmpresa: number) {

    this.concesionarioService.getConcesionarioVerifica(idEmpresa)
      .pipe(first())
      .subscribe(data => {

        if (data.estatus ) {

        this.verifica = data.concesionario;
        this.dataSource = new MatTableDataSource(this.verifica);
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
      this.getConsultaDocumentosVerifica(this.g.sindicato.value);
    });

  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
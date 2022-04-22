import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConcesionarioRegistro, CatalogoSindicatos } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConcesionarioService, CatalogosService} from '../../_services';
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

    //this.getConsultaRegistro();
    this.getCatalogoSindicatos();

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
      'sindicato': ['', Validators.required]
    });  

  }

  get g() { return this.reactiveForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.reactiveForm.valid) {
      this.getConsultaRegistro(this.g.sindicato.value);
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



    //Consulta los datos de concesionarios aprobados
    getConsultaRegistro(idEmpresa: number){
      //this.clear();


      this.concesionarioService.getRegistroConcesionario(idEmpresa)
        .pipe(first())
        .subscribe(data => {   

          if (data.estatus ) {
 
          this.registro = data.concesionario;   
          this.dataSource = new MatTableDataSource(this.registro);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";

          } else {

            this.notifier.notify('warning', data.mensaje);
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


    //Edita el concesionario/preregistro
    contrato(e: any) {

      const dialogRef = this.dialog.open(DialogoContratoComponent, {
        data: { IdVehiculo: e.IdVehiculo, nombreConcesionario: e.NombreConcesionario, sindicato: e.Sindicato, piloto: e.Piloto},
        disableClose: true,
        //width: '1500px',
        //height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaRegistro(this.g.sindicato.value);
      });

    }



     //Edita los documentos
     documentos(e: any) {

      const dialogRef = this.dialog.open(DialogoDocumentosRegistroComponent, {
        disableClose: true,
        data: { IdVehiculo: e.IdVehiculo, IdConcesionario: e.IdConcesionario, nombreConcesionario: e.NombreConcesionario, marca: e.Marca,
        submarca: e.Submarca, modelo: e.Modelo, piloto: e.Piloto},
        width: '1500px',
        //height: '700px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaRegistro(this.g.sindicato.value);
      });

    }
     

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
  
}


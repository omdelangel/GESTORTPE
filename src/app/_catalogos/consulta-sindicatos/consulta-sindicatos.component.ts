import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoSindicato } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { AltaSindicatosComponent } from '../alta-sindicatos/alta-sindicatos.component';
import { EdicionSindicatosComponent } from '../edicion-sindicatos/edicion-sindicatos.component';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-consulta-sindicatos',
  templateUrl: './consulta-sindicatos.component.html',
  styleUrls: ['./consulta-sindicatos.component.scss']
})
export class ConsultaSindicatosComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = [
                      'Nombre',
                      'Seccion',
                      'Responsable',
                      'Direccion',
                      'Region',
                      'TipoConvertidor',
                      'Estatus',
                      'actions'
                      ];                      
  dataSource!: MatTableDataSource<CatalogoSindicato>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm          !: FormGroup;
  catalogoSindicato      : CatalogoSindicato[] = [];

  constructor(
    public dialog:                MatDialog,
    private alertService:         AlertService,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaSindicatos();

  //Validaci??n de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Nombre'      :[''],
      'Bloqueado'       :[''],
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
  
  //Abre modal para Sindicatos
    openDialog(): void {
      const dialogRef = this.dialog.open(AltaSindicatosComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaSindicatos();
      });
    }


  //Consulta los datos de Sindicatos
  getConsultaSindicatos(){
      this.catalogosService.getCatalogoSindicato()
        .pipe(first())
        .subscribe(data => {   
          this.catalogoSindicato     = data.sindicatosLista;   
          this.dataSource           = new MatTableDataSource(this.catalogoSindicato);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort      = this.sort;
        },
          error => {  
          });
    }

  //cambiar valor de Bloqueo
    cambiaBloqueo(e: any){
      e.Bloqueado = !e.Bloqueado;
      this.catalogosService.getCatUsuBloqueado(e)
        .pipe(first())
        .subscribe(data => {   
          this.getConsultaSindicatos();
        },
          error => {  
          });
    }


  //Edita el registro de Sindicatos
    editar(e: any) {
      const dialogRef = this.dialog.open(EdicionSindicatosComponent, {
        disableClose: true,
        data: { 
                IdSindicato                :e.IdSindicato             ,
                Nombre                     :e.Nombre                  ,
                Seccion                    :e.Seccion                 ,
                Responsable                :e.Responsable             ,
                Direccion                  :e.Direccion               ,
                Telefono                   :e.Telefono                ,
                IdRegion                   :e.IdRegion                ,
                IdTipoConvertidor          :e.IdTipoConvertidor       ,
                Estatus                    :e.Estatus                 ,
          },
//        width: '1500px',
//        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaSindicatos();
      });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    } 
}



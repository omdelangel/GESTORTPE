import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoDictamenes } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { PreregistroDialogComponent } from '../../_components/preregistro-dialog';
import { PreregistroEdicionDialogComponent } from '../../_components/preregistro-edicion-dialog';
import { NotifierService } from 'angular-notifier';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cat-dictamenes',
  templateUrl: './cat-dictamenes.component.html',
  styleUrls: ['./cat-dictamenes.component.scss']
})

export class CatDictamenesComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = ['IdDictamen', 
                      'Nombre', 
                      'Estatus', 
                      'actions'];                      
  dataSource!: MatTableDataSource<CatalogoDictamenes>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm!:       FormGroup;
  catalogoDictamenes:  CatalogoDictamenes[] = [];

  constructor(
    public dialog:                MatDialog,
    private alertService:         AlertService,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaDictamen();

  //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdDictamen'      :[''],
      'Nombre'          :[''],
      'Estatus'         :[''],
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
  
  //Abre modal para Dictamen
    openDialog(): void {
      const dialogRef = this.dialog.open(PreregistroDialogComponent, {
        disableClose: true,
        width: '1500px',
        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaDictamen();
      });
    }


  //Consulta los datos de Dictamen
    getConsultaDictamen(){
      this.catalogosService.getCatalogoDictamenes()
        .pipe(first())
        .subscribe(data => {   

          this.catalogoDictamenes   = data.contenido;   
          this.dataSource           = new MatTableDataSource(this.catalogoDictamenes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort      = this.sort;
        },
          error => {  
          });
    }

  //cambiar estatatus(Inactivo/Activo)  
    changeEstatus(e: any){

      e.Estatus = !e.Estatus;

      this.catalogosService.actualizaCatalogoDictamen(e)
        .pipe(first())
        .subscribe(data => {   
          this.getConsultaDictamen();
        },
          error => {  
          });
    }




  //Edita el registro de Dictamen
    editar(e: any) {
      const dialogRef = this.dialog.open(PreregistroEdicionDialogComponent, {
        disableClose: true,
        data: { IdConcesionario: e.IdConcesionario, IdVehiculo: e.IdVehiculo, IdPropietario: e.IdPropietario},
        width: '1500px',
        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaDictamen();
      });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
  
  //Manejo de alertas
    success(message: string) {
      this.alertService.success(message, 'success');
    }
  
    error(message: string) {
      this.alertService.error(message, 'error');
    }
  
    info(message: string) {
      this.alertService.info(message, 'info');
    }
  
    warn(message: string) {
      this.alertService.warn(message, 'warn');
    }
  
    clear() {
      this.alertService.clear();
    }
  
}


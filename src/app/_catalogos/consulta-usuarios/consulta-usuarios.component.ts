import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoUsuarios } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { AltaUsuariosComponent } from '../alta-usuarios';
import { PreregistroEdicionDialogComponent } from '../../_components/preregistro-edicion-dialog';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.scss']
})

export class ConsultaUsuariosComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = ['Nombre',
                      'Perfil',
                      'Estatus',
                      'email',
                      'Bloqueado',
                      'Intentos',
                      'actions'
                      ];                      
  dataSource!: MatTableDataSource<CatalogoUsuarios>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm!:       FormGroup;
  catalogoUsuarios:  CatalogoUsuarios[] = [];

  constructor(
    public dialog:                MatDialog,
    private alertService:         AlertService,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaUsuarios();

  //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdUsuario '      :[''],
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
  
  //Abre modal para Usuarios
    openDialog(): void {
      const dialogRef = this.dialog.open(AltaUsuariosComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaUsuarios();
      });
    }


  //Consulta los datos de Dictamen
    getConsultaUsuarios(){
      this.catalogosService.getCatalogoUsuarios()
        .pipe(first())
        .subscribe(data => {   
          console.log("Consulta Usuarios")
          console.log(data)
          this.catalogoUsuarios     = data.listaDat.usuarios;   
          console.log("Consulta catalogoUsuarios")
          console.log(this.catalogoUsuarios)
          this.dataSource           = new MatTableDataSource(this.catalogoUsuarios);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort      = this.sort;
        },
          error => {  
          });
    }

  //cambiar valor de Bloqueo
    cambiaBloqueo(e: any){
      console.log("cambia Bloqueo ")
      console.log(e.Bloqueado)
      e.Bloqueado = !e.Bloqueado;
      console.log(e.Bloqueado)
      console.log(e)
      this.catalogosService.getCatUsuBloqueado(e)
        .pipe(first())
        .subscribe(data => {   
          console.log("Actualiza Bloqueo Usuario  data ===>  ")
          console.log(data)
          this.getConsultaUsuarios();
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
        this.getConsultaUsuarios();
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



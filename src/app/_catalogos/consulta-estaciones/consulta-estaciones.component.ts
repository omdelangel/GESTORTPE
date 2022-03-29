import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoEstaciones } from 'src/app/_models';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { AltaEstacionesComponent } from '../alta-estaciones/alta-estaciones.component';
import { EdicionEstacionesComponent } from '../../_catalogos/edicion-estaciones/edicion-estaciones.component';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-consulta-estaciones',
  templateUrl: './consulta-estaciones.component.html',
  styleUrls: ['./consulta-estaciones.component.scss']
})
export class ConsultaEstacionesComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = [
                      'Nombre',
                      'Domicilio',
                      'Colonia',
                      'CP',
                      'IdEntidadFederal',
                      'IdMunicipio',
                      'Telefono',
                      'Empresa',
                      'RFC',
                      'Contacto',
                      'Region',
                      'Estatus',    
                      'actions'
                      ];                      
  dataSource!: MatTableDataSource<CatalogoEstaciones>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm          !: FormGroup;
  catalogoEstaciones     : CatalogoEstaciones[] = [];

  constructor(
    public dialog:                MatDialog,
    private alertService:         AlertService,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaEstaciones();

  //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdEstacion'      :[''],
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
      const dialogRef = this.dialog.open(AltaEstacionesComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaEstaciones();
      });
    }


  //Consulta los datos de Dictamen
  getConsultaEstaciones(){
      this.catalogosService.getCatalogoEstaciones()
        .pipe(first())
        .subscribe(data => {   
          console.log("Consulta Estaciones ")
          console.log(data)
          this.catalogoEstaciones     = data.estacionesLista;   
          console.log("Consulta catalogoEstaciones 1")
          console.log(this.catalogoEstaciones)
          this.dataSource           = new MatTableDataSource(this.catalogoEstaciones);
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
          this.getConsultaEstaciones();
        },
          error => {  
          });
    }


  //Edita el registro de Dictamen
    editar(e: any) {
      console.log("consulta-editar constrasenia  1")
      console.log(e.contrasenia)
      const dialogRef = this.dialog.open(EdicionEstacionesComponent, {
        disableClose: true,
        data: { 
          IdUsuario            :e.IdUsuario        ,           
          Nombre               :e.Nombre           ,           
          Contrasenia          :e.Contrasenia      ,           
          IdEmpleado           :e.IdEmpleado       ,           
          IdPerfil             :e.IdPerfil         ,           
          FechaRegistro        :e.FechaRegistro    ,           
          Estatus              :e.Estatus          ,           
          email                :e.email            ,           
          Bloqueado            :e.Bloqueado        ,           
          Intentos             :e.Intentos         ,           
          UltimaTransaccion    :e.UltimaTransaccion,           
          },
//        width: '1500px',
//        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaEstaciones();
      });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    } 
}




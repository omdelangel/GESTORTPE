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
import { AltaUsuariosComponent } from '../alta-usuarios';
import { EdicionUsuariosComponent } from '../../_catalogos/edicion-usuarios/edicion-usuarios.component';
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
                      'IdRegion',
                      'IdTipoConvertidor',
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

  //Validación de campos en pantalla
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
  
  //Abre modal para Usuarios
    openDialog(): void {
      const dialogRef = this.dialog.open(AltaUsuariosComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaSindicatos();
      });
    }


  //Consulta los datos de Dictamen
  getConsultaSindicatos(){
      this.catalogosService.getCatalogoSindicato()
        .pipe(first())
        .subscribe(data => {   
          console.log("Consulta Sindicatos ")
          console.log(data)
          this.catalogoSindicato     = data.sindicatosLista;   
          console.log("Consulta catalogoSindicato 1")
          console.log(this.catalogoSindicato)
          this.dataSource           = new MatTableDataSource(this.catalogoSindicato);
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
          this.getConsultaSindicatos();
        },
          error => {  
          });
    }


  //Edita el registro de Dictamen
    editar(e: any) {
      console.log("consulta-editar constrasenia  1")
      console.log(e.contrasenia)
      const dialogRef = this.dialog.open(EdicionUsuariosComponent, {
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



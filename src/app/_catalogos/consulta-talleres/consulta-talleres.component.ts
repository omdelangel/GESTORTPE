import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoTalleres } from 'src/app/_models';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { AltaTalleresComponent } from '../alta-talleres/alta-talleres.component';
import { EdicionTalleresComponent } from '../../_catalogos/edicion-talleres/edicion-talleres.component';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-consulta-talleres',
  templateUrl: './consulta-talleres.component.html',
  styleUrls: ['./consulta-talleres.component.scss']
})
export class ConsultaTalleresComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = [
                      'Nombre',
                      'RFC',
                      'Contacto',
                      'Domicilio',
                      'Colonia',
                      'Telefono',
                      'HorarioIni',
                      'HorarioFin',
                      'Concurrencia',
                      'DuracionCita',
                      'Estatus',    
                      'actions'
                      ];                      
  dataSource!: MatTableDataSource<CatalogoTalleres>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm          !: FormGroup;
  catalogoTalleres       : CatalogoTalleres[] = [];

  constructor(
    public dialog:                MatDialog,
    private alertService:         AlertService,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaTalleres();

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
      const dialogRef = this.dialog.open(AltaTalleresComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaTalleres();
      });
    }


  //Consulta los datos de Dictamen
  getConsultaTalleres(){
      this.catalogosService.getCatalogoTalleres()
        .pipe(first())
        .subscribe(data => {   
          console.log("Consulta Talleres ")
          console.log(data)
          this.catalogoTalleres     = data.talleresLista;   
          console.log("Consulta catalogoTalleres 1")
          console.log(this.catalogoTalleres)
          this.dataSource           = new MatTableDataSource(this.catalogoTalleres);
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
          this.getConsultaTalleres();
        },
          error => {  
          });
    }


  //Edita el registro de Talleres
    editar(e: any) {
      console.log("consulta-editar talleres")
      console.log(e)
      const dialogRef   = this.dialog.open(EdicionTalleresComponent, {
        disableClose: true,
        data: { 
                IdTaller            :e.IdTaller         , 
                Nombre              :e.Nombre           , 
                RFC                 :e.RFC              , 
                Contacto            :e.Contacto         , 
                Domicilio           :e.Domicilio        , 
                IdColonia           :e.IdColonia        , 
                NombreC             :e.NombreC          , 
                Telefono            :e.Telefono         , 
                HorarioIni          :e.HorarioIni       , 
                HorarioFin          :e.HorarioFin       , 
                Concurrencia        :e.Concurrencia     , 
                DuracionCita        :e.DuracionCita     , 
                Estatus			        :e.Estatus          ,	                
          },
//        width: '1500px',
//        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaTalleres();
      });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    } 
}

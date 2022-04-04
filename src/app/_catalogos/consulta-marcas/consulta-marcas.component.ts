import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Marcas } from 'src/app/_models';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { isEmpty } from 'lodash';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AltaTalleresComponent } from '../alta-talleres/alta-talleres.component';
import { EdicionTalleresComponent } from '../../_catalogos/edicion-talleres/edicion-talleres.component';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-consulta-marcas',
  templateUrl: './consulta-marcas.component.html',
  styleUrls: ['./consulta-marcas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ConsultaMarcasComponent implements OnInit {

  columnsToDisplay = ['Nombre', 'action'];
  expandDisplayedColumns = ['NombreSubmarca', 'TipoVehiculo', 'actions'];
  dataSource!: MatTableDataSource<Marcas>;
  expandedElement!: Marcas | null;

  private readonly notifier: NotifierService;
  panelOpenState: boolean = false;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = [
                      'Nombre',
                      'actions'
                      ];                      
  //dataSource!: MatTableDataSource<Marcas>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm          !: FormGroup;
  marcas                 : Marcas[] = [];

  constructor(
    public dialog:                MatDialog,
    private alertService:         AlertService,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaMarcas();

  //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Nombre'      :[''],
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
  
  //Abre modal para Talleres
    openDialog(): void {
      console.log("entre a openDialog de Marcas")
      const dialogRef = this.dialog.open(AltaTalleresComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaMarcas();
      });
    }

    openDialogPDF(e:any){

    }    

  //Consulta los datos de Dictamen
  getConsultaMarcas1(){
    this.catalogosService.getCatalogoMarca()
        .pipe(first())
        .subscribe(data => {   
          console.log("Consulta Marcas ")
          console.log(data)
          this.marcas     = data.MarcassLista;   
          console.log("Consulta Marcas")
          console.log(this.marcas)
          this.dataSource           = new MatTableDataSource(this.marcas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort      = this.sort;
        },
          error => {  
          });
    }



    getConsultaMarcas(){
//      this.submitted = true;  
   
      this.catalogosService.getCatalogoMarcaSubmarca()
      .pipe(first())
      .subscribe(data => {
 
        console.log("regresé del servico Marcas")
        console.log(data)
        if (data.estatus && !isEmpty(data.MarcassLista[0])) {
  
          // Assign the data to the data source for the table to render
          this.marcas = data.MarcassLista;
          console.log("Marcas")
          console.log(this.marcas)
  
          this.dataSource = new MatTableDataSource(this.marcas);
          console.log("dataSource")
          console.log(this.dataSource)

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
          var elemReport = document.getElementById('divReport');
          elemReport!.style.visibility = "visible";
  
        } else {
          var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
  
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";
  
            var elemReport = document.getElementById('divReport');
            elemReport!.style.visibility = "hidden";

            this.notifier.notify('info', data.mensaje, '');    
        }
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
          this.getConsultaMarcas();
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
        this.getConsultaMarcas();
      });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    } 
}

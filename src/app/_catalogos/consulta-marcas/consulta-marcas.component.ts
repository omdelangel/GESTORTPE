import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoMarcas } from 'src/app/_models';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../_alert';
import { isEmpty } from 'lodash';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AltaMarcaSubmarcaComponent } from '../alta-marca-submarca/alta-marca-submarca.component';
import { EdicionMarcaSubmarcaComponent } from '../../_catalogos/edicion-marca-submarca/edicion-marca-submarca.component';
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
  expandDisplayedColumns = ['NombreSubmarca', 'TipoVehiculo'];
  dataSource!: MatTableDataSource<CatalogoMarcas>;
  expandedElement!: CatalogoMarcas | null;

  private readonly notifier: NotifierService;
  panelOpenState: boolean = false;
  submitted = false;

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
  dataList               : any[] = [];


  constructor(
    public dialog:                MatDialog,
    private alertService:         AlertService,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {
    console.log("OnInit")
    this.getConsultaMarcas();
    console.log("OnInit1")

  //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Nombre'      :[''],   
      'action'      :[''],   
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
  

  //Abre modal para Alta de Marca/Submarca
    openDialog(): void {
      console.log("entre a openDialog de Marcas")
      const dialogRef = this.dialog.open(AltaMarcaSubmarcaComponent, {
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


    getConsultaMarcas(){
      console.log("Consulta Marcas4")
//      this.submitted = true;  
   
      this.catalogosService.getCatalogoMarcaSubmarca()
      .pipe(first())
      .subscribe(data => {
 
        console.log("regresé del servico Marcas")
        console.log(data)
        
        if (data.estatus ) {
  
          // Assign the data to the data source for the table to render
          this.dataList               = data.marca;
          this.dataSource             = new MatTableDataSource(data.marca);
          this.dataSource.paginator   = this.paginator;
          this.dataSource.sort        = this.sort;
  
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
          this.notifier.notify('error', error, '');
  
        });
  
    }


//cambiar valor de Estatus
changeEstatus(e: any){
  if (e.Estatus == "A") {
      e.Estatus = 1;
     } else if (e.Estatus == "I") {
      e.Estatus = 0;
     }
    this.catalogosService.postModificaMarca(e)
      .pipe(first())
      .subscribe(data => {   
        this.getConsultaMarcas();
    },
      error => {  
      });
}



  //Edita el registro de Marcas/Submarcas
  editarMarca(e: any) {
    console.log("editar Marca")
    console.log(e)
   
    const dialogRef   = this.dialog.open(EdicionMarcaSubmarcaComponent, {
      disableClose: true,
      data: { 
              IdMarca             :e.IdMarca          , 
              Nombre              :e.Nombre           ,                 
        },
//        width: '1500px',
//        height: '900px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaMarcas();
    });
   
  }

  //Edita el registro de Marcas/Submarcas
    editar(e: any) {
      console.log("editar SubMarca1")
      console.log(e)
     
      const dialogRef   = this.dialog.open(EdicionMarcaSubmarcaComponent, {
        disableClose: true,
        data: { 
                IdMarca             :e.IdMarca          , 
                Nombre              :e.Nombre           ,                 
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

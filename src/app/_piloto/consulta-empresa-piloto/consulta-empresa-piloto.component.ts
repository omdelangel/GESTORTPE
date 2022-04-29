import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { first } from 'rxjs/operators';
import { PromocionesSindicato } from '../../_models/piloto.model';
import { PilotoService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AltaEmpresaPilotoComponent } from '../alta-empresa-piloto/alta-empresa-piloto.component';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-consulta-empresa-piloto',
  templateUrl: './consulta-empresa-piloto.component.html',
  styleUrls: ['./consulta-empresa-piloto.component.scss']
})
export class ConsultaEmpresaPilotoComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = ['Nombre',
                      'FechaInicio',
                      'FechaTermino',
                      'Duracion',
                      ];                      
  dataSource!: MatTableDataSource<PromocionesSindicato>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm              !:FormGroup;
  promocionesSindicato      :PromocionesSindicato[] = [];

  constructor(
    public dialog:                MatDialog,
    private pilotoService:        PilotoService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {
    this.getConsultaPromocionesSindicato();

  //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdSindicato'     :[''],
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
  
  //Abre modal para PromocionesSindicato
    openDialog(): void {
      const dialogRef = this.dialog.open(AltaEmpresaPilotoComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaPromocionesSindicato();
      });
    }


  //Consulta los datos de PromocionesSindicato
    getConsultaPromocionesSindicato(){
      this.pilotoService.getPromocionesEmpresa()
        .pipe(first())
        .subscribe(data => {   

          this.promocionesSindicato     = data.PromocionesSindsLista;   
          this.dataSource           = new MatTableDataSource(this.promocionesSindicato);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort      = this.sort;
        },
          error => {  
          });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
}




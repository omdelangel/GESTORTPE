import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConcesionarioConsulta } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConcesionarioService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerComponent } from '../../_components/pdf-viewer';
import 'jspdf-autotable';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reimpresion-qr',
  templateUrl: './reimpresion-qr.component.html',
  styleUrls: ['./reimpresion-qr.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReimpresionQRComponent implements OnInit {

  columnsToDisplay = ['NombreConcesionario', 'Modelo', 'Serie', 'Placa', 'action'];
  expandDisplayedColumns = ['NombreOperador', 'RFC', 'CURP',  'actions'];
  dataSource!: MatTableDataSource<ConcesionarioConsulta>;
  expandedElement!: ConcesionarioConsulta | null;


  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  reactiveForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  submitted = false;
  placa: string = "";
  nombreConcesionario: string = "";
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  dataList: any[] = [];
  isTableExpanded: boolean = false;
  
  

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialog: MatDialog,
    public concesionarioService: ConcesionarioService) {  }

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      'placa': ['', Validators.required],
      'IdConcesionario': [''],
      'NombreConcesionario': [''],
      'Serie': [''],
      'IdOperador': ['']
    });
  }

  get f() { return this.reactiveForm.controls; }



  onSubmit() {
    this.submitted = true;
    this.clear();

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    } else {

      this.placa = this.f.placa.value;
      this.concesionarioService.getConcesionarioQR(this.placa)
      .pipe(first())
      .subscribe(data => {
  
        if (data.estatus == true) {
  
          // Assign the data to the data source for the table to render
          this.dataList = data.vehiculo;
          this.nombreConcesionario = this.dataList[0].NombreConcesionario;
          this.idVehiculo = this.dataList[0].IdVehiculo;
          this.idConcesionario = this.dataList[0].IdConcesionario;

  
          this.dataSource = new MatTableDataSource(data.vehiculo);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
  
        }  else if (data.estatus == false){
          this.warn(data.mensaje);
  
          var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
  
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";
  
        }
      },
        error => {        
  
        });

    }
  }

    //Abre modal visualizar la factura
    openDialogPDF(row: any): void {
  
      const dialogRef = this.dialog.open(PdfViewerComponent, {
        width: '25%',
        height: '72%',
        data: { idConcesionario: this.idConcesionario, nombreConcesionario: this.nombreConcesionario, idVehiculo: this.idVehiculo, idOperador: row.IdOperador, nombreOperador: row.NombreOperador}
      }); 
      dialogRef.afterClosed().subscribe(res => {
        this.clear();  
      });
    }


  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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

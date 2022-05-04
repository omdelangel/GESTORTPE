import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Pagos } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { PagosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogoPagosComponent } from '../../_components/dialogo-pagos';
import 'jspdf-autotable';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PagosComponent implements OnInit {
  private readonly notifier: NotifierService;
  columnsToDisplay = ['NombreConcesionario', 'Marca', 'Submarca', 'Modelo', 'VIN', 'Placa', 'LitrosPendientesTot', 'MontoPendienteTot', 'action'];
  expandDisplayedColumns = ['FechaCorte', 'LitrosPendientes', 'MontoPendiente'];
  dataSource!: MatTableDataSource<Pagos>;
  expandedElement!: Pagos | null;


  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  reactiveForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  submitted = false;
  placa: string = "";
  dataList: any[] = [];
  isTableExpanded: boolean = false;
  

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public pagosService: PagosService,
    notifierService: NotifierService) { 

      this.notifier = notifierService;  
     }

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      'placa': ['', Validators.required],
    });
  }

  get f() { return this.reactiveForm.controls; }



  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    } else {

      this.placa = this.f.placa.value;
      this.pagosService.getPagosPendientes(this.placa)
      .pipe(first())
      .subscribe(data => {
  
        if (data.estatus == true) {
  
          // Assign the data to the data source for the table to render
          this.dataList = data.Encabezado;

  
          this.dataSource = new MatTableDataSource(data.Encabezado);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
  
        }  else if (data.estatus == false){
          
          this.notifier.notify('warning', data.mensaje);
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

  //Abre modal para registrar el pago
  pagar(row: any){

    const dialogRef = this.dialog.open(DialogoPagosComponent, {
      data: {idContrato: row.IdContrato, nombreConcesionario: row.NombreConcesionario, placa: row.Placa, 
        litrosPendientes: row.LitrosPendientesTot, montoPendiente: row.MontoPendienteTot }
    }); 
    dialogRef.afterClosed().subscribe(res => {

      this.onSubmit();
       
    });

  }




  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}


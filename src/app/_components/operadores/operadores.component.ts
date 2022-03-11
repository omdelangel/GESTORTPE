import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm , Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { OperadorService } from 'src/app/_services';
import { DialogoOperadorAltaComponent } from '../dialogo-operador-alta';
import { DialogoOperadorEditaComponent } from '../dialogo-operador-edita';
import { Operador } from 'src/app/_models';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.scss']
})
export class OperadoresComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['NombreCompleto', 'RFC', 'FechaNacimiento',
 'TipoPersona', 'EntidadFederativa', 'Telefono', 'Celular', 'email', 'Licencia', 'Estatus', 'actions']
  dataSource!: MatTableDataSource<Operador>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm!: FormGroup;
  operadores: Operador[] = [];
  submitted = false;
  placa: string = "";


  constructor(public dialog: MatDialog,
    private operadorService: OperadorService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService) {

      this.notifier = notifierService; 
     }

  ngOnInit(): void {

    this.getConsultaOperadores();

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'placa': ['', Validators.required]

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
      this.operadorService.getOperadorVehiculo(this.placa)
      .pipe(first())
      .subscribe(data => {

        console.log("data.operadores");
        console.log(data.operadores);
  
        if (data.estatus == true && data.operadores != "") {
  
          // Assign the data to the data source for the table to render
          this.operadores = data.operadores;

          this.dataSource = new MatTableDataSource(this.operadores);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";
  
          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "visible";
  
  
        }  else if (data.estatus == false ){
         
           var elemDiv = document.getElementById('divTitle');
            elemDiv!.style.visibility = "hidden";
  
            var elemTable = document.getElementById('htmlData');
            elemTable!.style.visibility = "hidden";            

            this.notifier.notify('warning', data.mensaje);
  
        } else if (data.estatus == true && data.operadores == ""){

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "hidden";

          var elemTable = document.getElementById('htmlData');
          elemTable!.style.visibility = "hidden";            

          this.notifier.notify('warning', data.mensaje);

          this.openDialog();

        }
      },
        error => {        
  
        });

    }
  }


      //Abre modal para alta de los operadores
      openDialog(): void {
        const dialogRef = this.dialog.open(DialogoOperadorAltaComponent, {
          disableClose: true,
          //width: '1500px',
          //height: '900px'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaOperadores();
        });
      }


      //Consulta los operadores
      getConsultaOperadores(){

        this.operadorService.getOperadorVehiculo(this.placa)
        .pipe(first())
        .subscribe(data => {   
 
          this.operadores = data.operadores;   
          this.dataSource = new MatTableDataSource(this.operadores);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
              
 
        },
          error => {
  
          });

      }

      changeEstatus(e: any){



      }

      editar(e: any){

        const dialogRef = this.dialog.open(DialogoOperadorEditaComponent, {
          disableClose: true,
          data: { data: e},
          //width: '1500px',
          //height: '900px'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaOperadores();
        });


      }

      
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
 
}

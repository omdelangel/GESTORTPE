import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm , Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { OperadorService } from 'src/app/_services';
import { DialogoOperadorAltaComponent } from '../dialogo-operador-alta';
import { DialogoOperadorEditaComponent } from '../dialogo-operador-edita';
import { Operador } from 'src/app/_models';
import { FormalizacionComponent } from '../formalizacion';


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
  idConcesionario: number = 0;
  idVehiculo: number = 0;
  idOperador: number = 0;
  estatus: string = "";
  value: boolean = false;

  constructor(public dialog: MatDialog,
    private operadorService: OperadorService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<FormalizacionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier = notifierService; 
      this.placa = data.Placa;

      this.getConsultaOperadores(this.placa);


     }

  ngOnInit(): void {

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
  
        if (data.estatus == true && data.operadores != "") {
  
          // Assign the data to the data source for the table to render
          this.operadores = data.operadores;
          this.idConcesionario = data.IdConcesionario;
          this.idVehiculo = data.IdVehiculo;


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

          this.idConcesionario = data.IdConcesionario;
          this.idVehiculo = data.IdVehiculo;
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
          data: {IdConcesionario: this.idConcesionario, IdVehiculo: this.idVehiculo}
          //width: '1500px',
          //height: '900px'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaOperadores(this.placa);
        });
      }


      //Consulta los operadores
      getConsultaOperadores(placa: string){

        this.operadorService.getOperadorVehiculo(placa)
        .pipe(first())
        .subscribe(data => {   

          
 
          if (data.estatus == true && data.operadores != "") {
  
            // Assign the data to the data source for the table to render
            this.operadores = data.operadores;
            this.idConcesionario = data.IdConcesionario;
            this.idVehiculo = data.IdVehiculo;
  
  
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
  
            this.idConcesionario = data.IdConcesionario;
            this.idVehiculo = data.IdVehiculo;
            //this.openDialog();
            
  
          }
              
 
        },
          error => {
            this.notifier.notify('success',error);
  
          });

      }

      changeEstatus(e: any){

        this.idOperador = e.IdOperador;
        if(e.Estatus == "A"){
        this.estatus = "I";
        } else if (e.Estatus == "I"){
          this.estatus = "A";
        }

        this.operadorService.postBajaOperador(this.idOperador, this.idVehiculo, this.estatus)
        .pipe(first())
        .subscribe(data => {  
          
          this.getConsultaOperadores(this.placa);
          this.notifier.notify('success', data.mensaje);
        },
          error => {
  
            this.notifier.notify('success',error);
          });

      }

      editar(e: any){

        const dialogRef = this.dialog.open(DialogoOperadorEditaComponent, {
          disableClose: true,
          data: { data: e, IdConcesionario: this.idConcesionario, IdVehiculo: this.idVehiculo},
          //width: '1500px',
          //height: '900px'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaOperadores(this.placa);
        });


      }

      onNoClick(): void {
        this.dialogRef.close();
      }

      
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
 
}

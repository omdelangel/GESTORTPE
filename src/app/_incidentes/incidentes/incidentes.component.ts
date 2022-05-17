import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm , Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { IncidenteService } from 'src/app/_services';
import { Incidente } from 'src/app/_models';
import { DialogoConfirmacionComponent } from './../../_components/dialogo-confirmacion';
import { DocumentosIncidentesComponent } from './../documentos-incidentes';
import { DialogoTalleresIncidenteComponent } from './../dialogo-talleres-incidente';
import { EdicionCitaIncidenteComponent} from './../edicion-cita-incidente';
import { getTestBed } from '@angular/core/testing';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface TiposIncidentes {
  TipoIncidente  : string;
  viewValue      : string;
} 

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.scss']
})
export class IncidentesComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  //Columnas en Tabla de consulta
  displayedColumns = [
//                      'IdTipoSiniestro'				,
//                      'IdIncidenteSiniestro'  ,
//                      'IdVehiculo'            ,
//                      'IdConcesionario'       ,
                      'Concesionario'         ,
                      'TipoConvertidor'       ,
                      'TipoVehiculo'          ,
                      'Vehiculo'              ,
                      'FechaContrato'         ,
                      'Sindicato'             ,
//                      'IdCita'                ,
                      'FechaCita'             ,
                      'EstatusCita'           ,
//                      'GenerarCita'           ,
//                      'DictaminarRevision'    ,
//                      'DocumentarEvidencia'   ,
//                      'DictaminarSeguro'      ,
//                      'RegistrarFechaArreglo' ,
                      'tiposIncidentes'       ,
                      'actions']
                    dataSource!: MatTableDataSource<Incidente>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm        !: FormGroup;
  incidente           :Incidente[] = [];
  submitted           =false;
  placa               :string = "";
  idConcesionario     :number = 0;
  idVehiculo          :number = 0;
  idOperador          :number = 0;
  estatus             :string = "";
  value               :boolean = false;
  matcher              = new MyErrorStateMatcher();
  TipoIncidenteB      :boolean = false;
  palabra             :string;
  Tiponcidente        :string = "";

  //Catálogos locales
  tiposIncidentes: TiposIncidentes[] = [
    { TipoIncidente: 'INC', viewValue: 'FALLA EN VEHÍCULO' },
    { TipoIncidente: 'ACC', viewValue: 'ACCIDENTE' },
    { TipoIncidente: 'PTR', viewValue: 'PERDIDA TOTAL O ROBO' }
  ];  


  constructor(
    public dialog              : MatDialog,
    private incidenteService    : IncidenteService,
    private formBuilder        : FormBuilder,
    notifierService            : NotifierService   
  ) {

      this.notifier = notifierService; 

     }

  ngOnInit(): void {

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'placa': ['', Validators.required]


    }); 
  }

  get f() { return this.reactiveForm.controls; }

  onSubmit() {
    this.placa = this.f.placa.value;
    this.getConsultaIncidente(this.placa)   
  }

  
  getConsultaIncidente(placa: string) {{
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    } else {

    
      this.incidenteService.getConcesionarioIncidente(placa)
      .pipe(first())
      .subscribe(data => {
  
        console.log("regreso del Incidente")
        console.log(data)
        if (data.estatus == true && data.concesionario != "") {

          // Assign the data to the data source for the table to render
          this.incidente         = data.concesionario;
          this.idConcesionario   = data.IdConcesionario;
          this.idVehiculo        = data.IdVehiculo;

          console.log("Tipo Incidente")
          console.log(this.incidente[0].IdTipoIncidente)
          if (this.incidente[0].IdTipoIncidente == ""){
            console.log("Entre")
              this.TipoIncidenteB = true;
          }else{
            this.TipoIncidenteB = false;
            console.log("No entre")
          }

          this.dataSource = new MatTableDataSource(this.incidente);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

//          selected = this.incidente[0].IdTipoIncidente;
          //this.selected.getTestBed('TipoIncidente').setValue(this.incidente[0].IdTipoIncidente);

  
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
}

//Guarda la cita
mostrarDialogoConfirmacion(event: any): void {     

  this.submitted = true;

  // stop here if form is invalid
  if (this.reactiveForm.invalid) {
    return;
  }
      if (event.value[0] == "ACC"){
          this.palabra = "un "
      }else{
        this.palabra = "una "
      }
      this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `Se registrará `+ this.palabra + event.value[1] +` para el vehículo ` + this.incidente[0].Vehiculo + `.`, 
        width: '50%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
            this.Tiponcidente = event.value[0];           
            this.aplicarSiniestro();
        } else {

        }
      });
  }
  
  //Abre modal para alta de los operadores
  aplicarSiniestro(): void {
    this.incidenteService.postConcesionarioIncidenteSiniestro(this.incidente[0].IdVehiculo, this.Tiponcidente )
    .pipe(first())
    .subscribe(data => {
        console.log("regreso de aplicarSiniestro ")
        console.log(data)
        if (data.estatus ) {
          this.placa = this.f.placa.value;
          this.getConsultaIncidente(this.placa)   
    }  else if (data.estatus == false ){
          
    var elemDiv = document.getElementById('divTitle');
      elemDiv!.style.visibility = "hidden";

      var elemTable = document.getElementById('htmlData');
      elemTable!.style.visibility = "hidden";            

      this.notifier.notify('warning', data.mensaje);
  }
  })
}


//Proceso para documentos
documentos(e: any){
   console.log("documentos e ")
   console.log(e)
   
  const dialogRef = this.dialog.open(DocumentosIncidentesComponent, {
    disableClose: true,
    data:{
      IdTipoSiniestro       :e.IdTipoSiniestro,
      IdIncidenteSiniestro  :e.IdIncidenteSiniestro,
      Concesionario         :e.Concesionario, 
      Vehiculo              :e.Vehiculo
    },
    //width: '1500px',
    //height: '900px'
  });

  dialogRef.afterClosed().subscribe(res => {
    this.getConsultaIncidente(this.placa);
  });    
}


//Registro de Citas para el incidente
cita(e: any) {

  if (e.EstatusCita == null || e.EstatusCita == "" || e.EstatusCita == "V" || e.EstatusCita == "C") {

    const dialogRef = this.dialog.open(DialogoTalleresIncidenteComponent, {
      disableClose: true,
      data: { 
            idCita                 :e.IdCita, 
            estatusCita            :e.EstatusCita, 
            IdIncidenteSiniestro   :e.IdIncidenteSiniestro,
            Concesionario          :e.Concesionario, 
            idConcesionario        :e.IdConcesionario, 
            idVehiculo             :e.IdVehiculo
            },
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaIncidente(this.placa);
    });

  } else {

    const dialogRef = this.dialog.open(EdicionCitaIncidenteComponent, {
      disableClose: true,
      data: {
            idCita            :e.IdCita, 
            estatusCita       :e.EstatusCita, 
            Concesionario     :e.Concesionario, 
            idConcesionario   :e.IdConcesionario, 
            idVehiculo        :e.IdVehiculo,
            Vehiculo          :e.Vehiculo
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaIncidente(this.placa);
    });
  }
}  





  //Abre modal para alta de los operadores
  openDialog(): void {
    /*
    const dialogRef = this.dialog.open(OperadoresAltaComponent, {
      disableClose: true,
      data: {IdConcesionario: this.idConcesionario, IdVehiculo: this.idVehiculo}
      //width: '1500px',
      //height: '900px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getConsultaIncidente(this.placa);
    });
    */
  }
  


  dictaminar(e: any){
    /*
        const dialogRef = this.dialog.open(DialogoOperadorEditaComponent, {
          disableClose: true,
          data: { data: e, IdConcesionario: this.idConcesionario, IdVehiculo: this.idVehiculo},
          //width: '1500px',
          //height: '900px'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaIncidente(this.placa);
        });
    */
    
  }
  confirmacion(e: any){
    /*
        const dialogRef = this.dialog.open(DialogoOperadorEditaComponent, {
          disableClose: true,
          data: { data: e, IdConcesionario: this.idConcesionario, IdVehiculo: this.idVehiculo},
          //width: '1500px',
          //height: '900px'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          this.getConsultaOperadores(this.placa);
        });
    */
    
  }
      
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
   
}


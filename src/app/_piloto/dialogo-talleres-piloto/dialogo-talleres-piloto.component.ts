import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Taller } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { TalleresService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AltacitaPilotoComponent } from '../altacita-piloto';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialogo-talleres-piloto',
  templateUrl: './dialogo-talleres-piloto.component.html',
  styleUrls: ['./dialogo-talleres-piloto.component.scss']
})
export class DialogoTalleresPilotoComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['Nombre', 'Domicilio', 'Colonia',
  'CP', 'Municipio',  'EntidadFederativa', 'Telefono', 'Contacto', 'HorarioIni', 'HorarioFin'];
  dataSource!: MatTableDataSource<Taller>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  frmStepFour!: FormGroup;
  taller: Taller[] = [];
  nombreConcesionario: string = "";
  idConcesionario: number = 0;
  idVehiculo: number = 0;
  divTalleres: boolean = true;
  divCitas: boolean = false;

  tallerValue: string = "";
  domicilioValue: string = "";
  contactoValue: string = "";
  telefonoValue: string = "";
  diaValue: string = ""; 
  horaValue: string = "";  
  idCitaValue: number = 0;
  estatusCita: string = "";

  constructor(public dialog: MatDialog,
    private tallerService: TalleresService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<DialogoTalleresPilotoComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) {


       this.notifier = notifierService; 
        dialogRef.disableClose = true;
       this.nombreConcesionario = data.nombreConcesionario;
       this.idConcesionario = data.idConcesionario;       
       this.idVehiculo = data.idVehiculo;
       this.idCitaValue = data.idCita;
       this.estatusCita = data.estatusCita;

    }

  ngOnInit(): void {

    this.getTalleres();

    //Validaci??n de campos en pantalla
    this.frmStepFour = this.formBuilder.group({
      'IdTaller': [''],
      'Nombre':[''],
      'RFC': [''],
      'Domicilio':[''],
      'IdColonia': [''],
      'Colonia':[''],
      'CP':[''], 
      'Municipio': [''],
      'EntidadFederativa':[''],
      'Telefono':[''],
      'Contacto':[''],
      'HorarioIni':[''],
      'HorarioFin':[''],
      'Concurrencia':[''],
      'DuracionCita':[''],
      'Estatus':[''],
    });    

  }

  get g() { return this.frmStepFour.controls; }

  onSubmit() {
    if (this.frmStepFour.valid) {
      //console.log(this.reactiveForm.value)
    } else {
      return
    }
  }

  //Selecciona un registro de la tabla de consulta
  selectRecord(row: any){

    const dialogRef = this.dialog.open(AltacitaPilotoComponent, {
      data: {idCita: this.idCitaValue, estatusCita: this.estatusCita, idTaller: row.IdTaller, nombreTaller: row.Nombre, domicilio: row.Domicilio + " " + row.Colonia + " " + "CP: " +row.CP + " " + 
      row.Municipio + " " + row.EntidadFederativa, telefono: row.Telefono, contacto: row.Contacto, nombreConce: this.nombreConcesionario,
      idConce: this.idConcesionario, idVehi: this.idVehiculo},
      width: '100%',
      //height: '100%'
    });

    dialogRef.afterClosed().subscribe(res => {


     if (res != undefined) {

      if(res.idCita > 0){

        this.divTalleres = false;
        this.divCitas = true;
        this.tallerValue = row.Nombre;
        this.domicilioValue = row.Domicilio + " " + row.Colonia + " " + "CP: " +row.CP + " " + 
        row.Municipio + " " + row.EntidadFederativa
        this.contactoValue = row.Contacto;
        this.telefonoValue = row.Telefono;
        this.diaValue = res.dia;
        this.horaValue = res.hora;
        sessionStorage.setItem("NuevaCita", res.idCita);

      } else if (res.idCita == undefined || res.idCita == 0 ){

        this.divTalleres = true;
        this.divCitas = false;
       this.getTalleres();
      } 
     } else {
       this.divTalleres = true;
       this.divCitas = false;
      this.getTalleres();

     }
    });

  }


  //Obtiene la lista de talleres
    getTalleres(){
      this.tallerService.getTalleres()
        .pipe(first())
        .subscribe(data => {  
          
          this.divTalleres = true;
          this.divCitas = false;
 
          this.taller = data.Talleres;   
          this.dataSource = new MatTableDataSource(this.taller);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;                       
        },
          error => {
  
           this.notifier.notify('error', error, '');
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


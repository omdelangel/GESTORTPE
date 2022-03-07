import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { FormGroup,FormControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Taller } from 'src/app/_models';
import { ErrorStateMatcher } from '@angular/material/core';
import { TalleresService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../_alert';
import { AltacitaComponent } from '../altacita';
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
  selector: 'app-dialogo-talleres',
  templateUrl: './dialogo-talleres.component.html',
  styleUrls: ['./dialogo-talleres.component.scss']
})
export class DialogoTalleresComponent implements OnInit {
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
 
   constructor(public dialog: MatDialog,
     private alertService: AlertService,
     private tallerService: TalleresService,
     private formBuilder: FormBuilder,
     notifierService: NotifierService,
     public dialogRef: MatDialogRef<AltacitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


        this.notifier = notifierService; 
         dialogRef.disableClose = true;
        this.nombreConcesionario = data.nombreConcesionario;
        this.idConcesionario = data.idConcesionario;       
        this.idVehiculo = data.idVehiculo;

     }
 
   ngOnInit(): void {
 
     this.getTalleres();
 
     //Validación de campos en pantalla
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
 
     const dialogRef = this.dialog.open(AltacitaComponent, {
       data: { idTaller: row.IdTaller, nombreTaller: row.Nombre, domicilio: row.Domicilio + " " + row.Colonia + " " + "CP: " +row.CP + " " + 
       row.Municipio + " " + row.EntidadFederativa, telefono: row.Telefono, contacto: row.Contacto, nombreConce: this.nombreConcesionario,
       idConce: this.idConcesionario, idVehi: this.idVehiculo},
       width: '1500px',
       height: '900px'
     });
 
     dialogRef.afterClosed().subscribe(res => {
 
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
 
       } else if (res.idCita == undefined || res.idCita == 0){
 
         this.divTalleres = true;
         this.divCitas = false;
        this.getTalleres();
       } 
     });
 
   }
 
 
   //Obtiene la lista de talleres
     getTalleres(){
       this.clear()
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
   
   
     //Manejo de alertas
     success(message: string) {
       this.alertService.success(message, 'success');
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
 
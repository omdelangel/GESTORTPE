import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IncidenteService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { DialogoDictamenCitaIncidenteComponent } from '../dialogo-dictamen-cita-incidente/';
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DocumentoEvidenciaTaller } from 'src/app/_models';
import { DocViewerComponent } from '../../_components/doc-viewer'; 
import { DialogoConfirmacionIncidenteComponent } from '../dialogo-confirmacion-incidente';
import { Dictamen } from '../../_models/catalogos.model';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dictamen-incidente',
  templateUrl: './dictamen-incidente.component.html',
  styleUrls: ['./dictamen-incidente.component.scss']
})
export class DictamenIncidenteComponent implements OnInit {

  ArchivoDictamen              :string;
  private readonly notifier: NotifierService;
  public files: any[] = [];
  displayedColumns = ['ArchivoDictamen', 'actions'];
  dataSource!: MatTableDataSource<DocumentoEvidenciaTaller>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataVal: boolean      =false;
  dataTaller: boolean   =false;
  documentoEvidenciaTaller   :DocumentoEvidenciaTaller[] = [];

  Concesionario          :string = "";
  idCita                 :number = 0;
  reactiveForm           !:FormGroup;
  idVehiculo             :number = 0;
  idConcesionario        :number = 0;
  Vehiculo               :string = "";
  IdIncidenteSiniestro   :number = 0;
  estatusCita            :string = "";
  existentes             :number = 0;
  dictamen               :boolean = false;
  incidente              :boolean = false;
  
  constructor(
    notifierService            :NotifierService,
    private incidenteService   :IncidenteService,
    private formBuilder        :FormBuilder,
    public dialog              :MatDialog,
    public dialogRef           :MatDialogRef<DictamenIncidenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      dialogRef.disableClose = true;
      this.notifier                 = notifierService;
      this.idCita                   = data.idCita;
      this.estatusCita              = data.estatusCita;
      this.Concesionario            = data.Concesionario;
      this.idVehiculo               = data.idVehiculo;
      this.idConcesionario          = data.idConcesionario;
      this.Vehiculo                 = data.Vehiculo;
      this.IdIncidenteSiniestro     = data.IdIncidenteSiniestro;
     }

  ngOnInit(): void {

    this.obtieneCita(this.idCita);
    this.getDoctosEvidenciaDictamenTaller(this.idCita, this.IdIncidenteSiniestro);

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'Concesionario'  :[({ value: "", disabled: true })],
      'Taller'         :[({ value: "", disabled: true })],
      'Domicilio'      :[({ value: "", disabled: true })],
      'Telefono'       :[({ value: "", disabled: true })],
      'Contacto'       :[({ value: "", disabled: true })],
      'Fecha'          :[({ value: "", disabled: true })],
      'Hora'           :[({ value: "", disabled: true })],
    });
  }

  get f() { return this.reactiveForm.controls; }

  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }


 obtieneCita(idCita: number) {
    //this.clear();
    
    this.incidenteService.getCitaIncidente(idCita)
      .pipe(first())
      .subscribe(data => {
    
        this.f.Concesionario.setValue(this.Concesionario);
        this.f.Taller.setValue(data.citaIncidente[0].Taller);
        this.f.Domicilio.setValue(data.citaIncidente[0].Domicilio + " " + data.citaIncidente[0].Colonia + " " + data.citaIncidente[0].CP + " " + data.citaIncidente[0].Municipio + " " + data.citaIncidente[0].EntidadFederativa);
        this.f.Telefono.setValue(data.citaIncidente[0].Telefono);
        this.f.Contacto.setValue(data.citaIncidente[0].Contacto);
        this.f.Fecha.setValue(data.citaIncidente[0].Fecha);
        this.f.Hora.setValue(data.citaIncidente[0].Hora);
      },
      error => {        
        this.notifier.notify('warning', 'Error al obtener la cita', '');
      });     
  }
  

  //Dictaminar una cita
 dictamenCita() {

    const dialogRef = this.dialog.open(DialogoDictamenCitaIncidenteComponent, {
      disableClose: true,
      data: {
        idCita                  :this.idCita, 
        estatusCita             :this.estatusCita, 
        Concesionario           :this.Concesionario, 
        idConcesionario         :this.idConcesionario, 
        idVehiculo              :this.idVehiculo,
        Vehiculo                :this.Vehiculo,
        IdIncidenteSiniestro    :this.IdIncidenteSiniestro
  },
    });

    dialogRef.afterClosed().subscribe(res => {
       
      this.dialogRef.close();
      
    }); 

}

onNoClick(): void {
  this.dialogRef.close();
}

getDoctosEvidenciaDictamenTaller(idCita: number, IdIncidenteSiniestro:number) {

  this.incidenteService.getDoctosEvidenciaDictamenTaller(idCita, IdIncidenteSiniestro)
    .pipe(first())
    .subscribe(dataList => {
      if (dataList.estatus && dataList.ArchivoDictamen[0].archivo != '') {
        this.existentes = dataList.ArchivoDictamen.length
        this.dataVal = true;
        this.documentoEvidenciaTaller = dataList.ArchivoDictamen;
        this.dataSource = new MatTableDataSource(dataList.ArchivoDictamen);
        // Assign the data to the data source for the table to render
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.existentes = 0;
        this.dataVal = false;
//        this.notifier.notify('warning', dataList.mensaje);

      }
    },
      error => {

        this.dataVal = false;
        this.notifier.notify('error', error);

      });
}

  //Abre modal visualizar el documento
  verDocumento(archivoPDF: any): void {

    const dialogRef = this.dialog.open(DocViewerComponent, {
      width: '50%',
      height: '80%',
      disableClose: true,
      data: { archivoPDF: archivoPDF.archivo }
    });
    dialogRef.afterClosed().subscribe(res => {

    });
  }


  eliminarDocumentoTaller(archivoPDF: any) {

    this.dialog
      .open(DialogoConfirmacionIncidenteComponent, {
        data: `Se eliminará el archivo de dictamen: ` + archivoPDF.archivo,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
     
          this.eliminarEvidenciaTaller();

        } else {

        }
      });
  }  

  eliminarEvidenciaTaller() {

    this.incidenteService.postEliminaEvidenciaDictamenTaller(this.idCita, this.IdIncidenteSiniestro)
      .pipe(first())
      .subscribe(dataList => {

        if (dataList.estatus) {

          this.notifier.notify('success', dataList.mensaje);
          this.getDoctosEvidenciaDictamenTaller(this.idCita, this.IdIncidenteSiniestro);

        } else {

          this.notifier.notify('warning', dataList.mensaje);

        }
      },
        error => {

          this.notifier.notify('error', error);

        });
  }  


  onFileChangeTaller(pFileList: File[]) {

    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    if(this.files.length + this.existentes == 1){

      const fileListAsArray = Array.from(pFileList);
      fileListAsArray.forEach((item, i) => {
           const formData = new FormData();
             formData.append('IdCita', String(this.idCita)),  
             formData.append('IdIncidenteSiniestro', String(this.IdIncidenteSiniestro)),
             formData.append('ArchivoDictamen', item)
     
           this.incidenteService.postGuardaEvidenciaDictamenTaller(formData)
           .pipe(first())
           .subscribe(
             data => {
               if (data.estatus) {
                 this.notifier.notify('success', data.mensaje, '');
                 this.getDoctosEvidenciaDictamenTaller(this.idCita, this.IdIncidenteSiniestro);
               } else if (!data.estatus) {
                 this.notifier.notify('warning', data.mensaje, '');
               }
             },
             error => {
               //this.error(error);
               this.notifier.notify('error', error, '');
             });
      });

    } else {

      this.notifier.notify('warning', 'Favor de adjuntar solo 1 archivo de dictamen', '');
    }
  }

}


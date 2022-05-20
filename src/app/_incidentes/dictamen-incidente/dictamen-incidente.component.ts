import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { AlertService } from '../../_alert';
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
  displayedColumns = ['ArchivoEvidencia', 'actions'];
  dataSource!: MatTableDataSource<DocumentoEvidenciaTaller>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataVal: boolean      =false;
  dataTaller: boolean   =false;
  documentoEvidenciaTaller   :DocumentoEvidenciaTaller[] = [];



  Concesionario: string = "";
  idCita: number = 0;
  reactiveForm!: FormGroup;
  idVehiculo: number = 0;
  idConcesionario: number = 0;
  cancelar: boolean = false;
  dictamen: boolean = false;
  nuevaCita: boolean = false;
  btnVal: string = "CANCELAR Y AGENDAR NUEVA CITA";
  valorCancel: boolean = false;
  Vehiculo            :string = "";
  IdIncidenteSiniestro: number = 0;
  modelo: string = "";
  estatusCita: string = "";
  incidente: boolean = false;
  existentes     :number = 0;

  constructor(
    notifierService            :NotifierService,
    private incidenteService   :IncidenteService,
    private alertService       :AlertService,
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
    console.log("obtieneCita")
    console.log(idCita)
    
    this.incidenteService.getCitaIncidente(idCita)
      .pipe(first())
      .subscribe(data => {
        console.log("obtieneCita data")
        console.log(data)
    
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
      console.log("getDoctosEvidenciaDictamenTallers ArchivoDictamen ")
      console.log(dataList.ArchivoDictamen)

      if (dataList.estatus) {
        this.existentes = dataList.Evidencias.length
        console.log("Existentes")
        console.log (this.existentes)
        this.dataVal = true;
        this.documentoEvidenciaTaller = dataList.ArchivoDictamen;
        this.dataSource = new MatTableDataSource(this.documentoEvidenciaTaller);
        // Assign the data to the data source for the table to render
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {

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
      data: { archivoPDF: archivoPDF.ArchivoEvidencia }
    });
    dialogRef.afterClosed().subscribe(res => {

    });
  }


  eliminarDocumentoTaller(archivoPDF: any) {
    console.log("eliminar archivo1 ")
    console.log(archivoPDF)

    this.dialog
      .open(DialogoConfirmacionIncidenteComponent, {
        data: `Se eliminará el archivo de dictamen: ` + archivoPDF.ArchivoEvidencia,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          console.log("eliminar archivo 2")

      
          this.eliminarEvidenciaTaller(archivoPDF.IdEvidencias);

        } else {

        }
      });
  }  

  eliminarEvidenciaTaller(idEvidencia: number) {
    console.log("eliminar archivo")
    console.log(idEvidencia)

    this.incidenteService.postEliminaEvidencia(this.IdIncidenteSiniestro, idEvidencia,)
      .pipe(first())
      .subscribe(dataList => {

        if (dataList.estatus) {

          this.notifier.notify('success', dataList.mensaje);

        } else {

          this.notifier.notify('warning', dataList.mensaje);

        }
      },
        error => {

          this.notifier.notify('error', error);

        });
  }  


  onFileChangeTaller(pFileList: File[]) {
    console.log("entre a cargar")
    console.log(pFileList)

    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    console.log(this.files.length+this.existentes)

    if(this.files.length + this.existentes == 1){

      const fileListAsArray = Array.from(pFileList);
      fileListAsArray.forEach((item, i) => {
           console.log("item")
           console.log(item)
           console.log(item.name)

           const formData = new FormData();
             formData.append('IdCita', String(this.idCita)),  
             formData.append('IdIncidenteSiniestro', String(this.IdIncidenteSiniestro)),
             formData.append('ArchivoEvidencia', item)
     
           this.incidenteService.postGuardaEvidenciaDictamenTaller(formData)
           .pipe(first())
           .subscribe(
             data => {
               console.log("regrse de agregar doctos incidente")
               console.log(data)
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
   


      //     const endpoint = 'your-destination-url';
       //   const formData: FormData = new FormData();
       //   formData.append('fileKey', item, item.name);
       //   return this.httpClient
      //      .post(endpoint, formData, { headers: yourHeadersConfig })
      //      .map(() => { return true; })
        //    .catch((e) => this.handleError(e));
  
      });

    } else {
      console.log("entre al error al cargar")

      this.notifier.notify('warning', 'Favor de adjuntar solo 1 archivo de dictamen', '');
    }
  }

/*
  onFileChange(pFileList: File[]) {


    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    const fileListAsArray = Array.from(pFileList);
    fileListAsArray.forEach((item, i) => {

      const formData = new FormData();
      formData.append('ArchivoEvidencia', item),
        formData.append('IdEvidencias', String(this.idEvidencia)),  //siempre es 0 para el alta
        formData.append('IdSiniestro', String(this.idIncidenteSiniestro))

      this.incidenteService.postGuardaEvidencias(formData)
        .pipe(first())
        .subscribe(
          data => {

            if (data.estatus) {
              this.notifier.notify('success', data.mensaje, '');
              this.getDocumentosEvidencia(Number(this.idIncidenteSiniestro));
            } else if (!data.estatus) {
              this.notifier.notify('warning', data.mensaje, '');
            }
          },
          error => {
            //this.error(error);
            this.notifier.notify('error', error, '');
          });
    });
  }
*/



}


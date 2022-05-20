import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { DocumentoEvidenciaSeguro } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocViewerComponent } from '../../_components/doc-viewer'; 
import { IncidenteService } from 'src/app/_services';
import { DialogoConfirmacionIncidenteComponent } from '../dialogo-confirmacion-incidente';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dialogo-dictamen-seguro',
  templateUrl: './dialogo-dictamen-seguro.component.html',
  styleUrls: ['./dialogo-dictamen-seguro.component.scss']
})
export class DialogoDictamenSeguroComponent implements OnInit {

  private readonly notifier: NotifierService;

  displayedColumns = ['ArchivoResolucionSeguro', 'actions'];
  dataSource!: MatTableDataSource<DocumentoEvidenciaSeguro>;

  documentoEvidencia: DocumentoEvidenciaSeguro[] = [];
  public files: any[] = [];
  idEvidencia: number = 0;
  idIncidenteSiniestro: number = 0;
  idTipoIncidente: string = "";
  concesionario: string = "";
  vehiculo: string = "";
  reactiveForm!: FormGroup;
  submitted = false;
  dataVal: boolean = false;
  valRadio: boolean = false;
  idVehiculo: number = 0;

  constructor(private formBuilder: FormBuilder,
    public incidenteService: IncidenteService,
    notifierService: NotifierService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogoDictamenSeguroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


      this.notifier = notifierService;
      this.idIncidenteSiniestro = data.IdIncidenteSiniestro;
      this.concesionario = data.Concesionario;
      this.vehiculo = data.Vehiculo;
      this.idTipoIncidente = data.IdTipoSiniestro;
      this.idVehiculo = data.idVehiculo;
     }

  ngOnInit(): void {    

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'dictamen': [({ value: "", disabled: true })],
      'ArchivoResolucionSeguro': [''],
    });

    this.getDocumentosEvidencia(this.idIncidenteSiniestro, this.idVehiculo);
  }

  get f() { return this.reactiveForm.controls; }

  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }

  onFileChangeSeguro(pFileList: File[]) {

    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    if(this.files.length == 1){

      const fileListAsArray = Array.from(pFileList);
      fileListAsArray.forEach((item, i) => {

      const fileListAsArray = Array.from(pFileList);
      fileListAsArray.forEach((item, i) => {

      const formData = new FormData();
      formData.append('IdVehiculo', String(this.idVehiculo)),  //siempre es 0 para el alta
      formData.append('IdSiniestro', String(this.idIncidenteSiniestro))
      formData.append('ArchivoResolucion', item),

      this.incidenteService.postGuardaDocumentoSeguro(formData)
        .pipe(first())
        .subscribe(
          data => {

            if (data.estatus) {
              this.notifier.notify('success', data.mensaje, '');
              

            } else if (!data.estatus) {
              this.notifier.notify('warning', data.mensaje, '');
            }
          },
          error => {
            //this.error(error);
            this.notifier.notify('error', error, '');
          });
    });
         


  
      });

    } else {

      this.notifier.notify('warning', 'Favor de adjuntar solo 1 archivo de dictamen', '');

    }


  }

  getDocumentosEvidencia(idIncidenteSiniestro: number, idVehiculo: number) {

    this.incidenteService.getDocumentoSeguro(idIncidenteSiniestro, idVehiculo)
      .pipe(first())
      .subscribe(dataList => {

        if (dataList.estatus) {

          this.dataVal = true;
          this.documentoEvidencia = dataList.siniestro;

          console.log("this.documentoEvidencia")
          console.log(this.documentoEvidencia)
          this.dataSource = new MatTableDataSource(this.documentoEvidencia);

        } else {

          this.dataVal = false;
          this.notifier.notify('warning', dataList.mensaje);

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


    onNoClick(): void {
      this.dialogRef.close();
    }


  eliminarDocumentoSeguro(archivoPDF: any) {

    this.dialog
      .open(DialogoConfirmacionIncidenteComponent, {
        data: `Se eliminará el archivo de dictamen: ` + archivoPDF.ArchivoEvidencia,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.eliminarEvidenciaSeguro(archivoPDF.IdEvidencias);

        } else {

        }
      });
  }


  eliminarEvidenciaSeguro(idEvidencia: number) {

    this.incidenteService.postEliminaEvidencia(this.idIncidenteSiniestro, idEvidencia,)
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

  confirmaDictamen(){


  }


}

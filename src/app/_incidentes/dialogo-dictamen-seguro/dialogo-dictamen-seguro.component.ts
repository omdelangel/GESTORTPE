import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { DocumentoEvidencia } from 'src/app/_models';
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

  displayedColumnsSeguro = ['ArchivoEvidencia', 'actions'];
  dataSourceSeguro!: MatTableDataSource<DocumentoEvidencia>;

  documentosEvidencia: DocumentoEvidencia[] = [];
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

  constructor(private formBuilder: FormBuilder,
    public incidenteService: IncidenteService,
    notifierService: NotifierService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogoDictamenSeguroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log("data")
      console.log(data)

      this.notifier = notifierService;
      this.idIncidenteSiniestro = data.IdIncidenteSiniestro;
      this.concesionario = data.Concesionario;
      this.vehiculo = data.Vehiculo;
      this.idTipoIncidente = data.IdTipoSiniestro;
     }

  ngOnInit(): void {

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'dictamen': [({ value: "", disabled: true })],
    });
  }

  get f() { return this.reactiveForm.controls; }

  onFileChangeSeguro(pFileList: File[]) {

    this.f.dictame.enable();


    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    if(this.files.length == 1){

      const fileListAsArray = Array.from(pFileList);
      fileListAsArray.forEach((item, i) => {
         


  
      });

    } else {

      this.notifier.notify('warning', 'Favor de adjuntar solo 1 archivo de dictamen', '');

    }


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

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IncidenteService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';
import { DocumentoEvidencia } from 'src/app/_models';
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
  selector: 'app-documentos-incidentes',
  templateUrl: './documentos-incidentes.component.html',
  styleUrls: ['./documentos-incidentes.component.scss']
})
export class DocumentosIncidentesComponent implements OnInit {

  private readonly notifier: NotifierService;

  displayedColumns = ['ArchivoEvidencia', 'actions'];
  dataSource!: MatTableDataSource<DocumentoEvidencia>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  public files: any[] = [];
  idEvidencia: number = 0;
  idIncidenteSiniestro: number = 0;
  idTipoIncidente: string = "";
  concesionario: string = "";
  vehiculo: string = "";
  reactiveForm!: FormGroup;
  dataVal: boolean = false;
  documentosEvidencia: DocumentoEvidencia[] = [];
  submitted = false;
  tipoSiniestro: boolean = false;


  constructor(private formBuilder: FormBuilder,
    public incidenteService: IncidenteService,
    notifierService: NotifierService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DocumentosIncidentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.notifier = notifierService;
    this.idIncidenteSiniestro = data.IdIncidenteSiniestro;
    this.concesionario = data.Concesionario;
    this.vehiculo = data.Vehiculo;
    this.idTipoIncidente = data.IdTipoSiniestro;

    if (this.idTipoIncidente != 'ACC') {
      this.tipoSiniestro = true;
    } else {
      this.tipoSiniestro = false;
    }

  }

  ngOnInit(): void {

    this.getDocumentosEvidencia(Number(this.idIncidenteSiniestro));

    //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdDocumento': [''],
      'Documento': [''],
      'IdVehiculo': [''],
      'NombreArchivo': [''],
      'Faltante': [''],
      'Calificacion': [''],
      'Observaciones': ['']
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


  getDocumentosEvidencia(idIncidenteSiniestro: number) {


    this.incidenteService.getDocumentosEvidencia(idIncidenteSiniestro)
      .pipe(first())
      .subscribe(dataList => {

        if (dataList.estatus) {

          this.dataVal = true;
          this.documentosEvidencia = dataList.Evidencias;
          this.dataSource = new MatTableDataSource(this.documentosEvidencia);
          // Assign the data to the data source for the table to render
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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

  eliminarDocumento(archivoPDF: any) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
      return;
    }

    this.dialog
      .open(DialogoConfirmacionIncidenteComponent, {
        data: `Se eliminará la evidencia: ` + archivoPDF.ArchivoEvidencia,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.eliminarEvidencia(archivoPDF.IdEvidencias);

        } else {

        }
      });
  }

  eliminarEvidencia(idEvidencia: number) {

    this.incidenteService.postEliminaEvidencia(this.idIncidenteSiniestro, idEvidencia,)
      .pipe(first())
      .subscribe(dataList => {

        if (dataList.estatus) {

          this.getDocumentosEvidencia(Number(this.idIncidenteSiniestro));
          this.notifier.notify('success', dataList.mensaje);

        } else {

          this.notifier.notify('warning', dataList.mensaje);

        }
      },
        error => {

          this.notifier.notify('error', error);

        });
  } 

}



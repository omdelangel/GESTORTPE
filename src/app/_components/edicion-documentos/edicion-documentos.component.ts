import { Component, OnInit, Inject, Optional, ViewChild  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { DocumentosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { DocumentosVehiculo } from '../../_models';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog';
import { DocViewerComponent } from '../doc-viewer'; 
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Row } from 'jspdf-autotable';
import {SelectionModel} from '@angular/cdk/collections';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edicion-documentos',
  templateUrl: './edicion-documentos.component.html',
  styleUrls: ['./edicion-documentos.component.scss']
})
export class EdicionDocumentosComponent implements OnInit {
  private readonly notifier: NotifierService;

  displayedColumns = ['Documento', 'NombreArchivo', 'Faltante', 'archivoPDF', 'actions'];
  dataSource!: MatTableDataSource<DocumentosVehiculo>;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  frmStepFive!: FormGroup;
  idVehiculo: number = 0;
  uploadedFiles!: Array<File>;
  disable: boolean = false;
  isLoading = false;
  idConcesionario: any;
  nombreConcesionarioValue: string = "";
  marcaValue: string = "";
  submarcaValue: string = "";
  modeloValue: string = "";
  piloto: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private documentosService: DocumentosService,
    public dialog: MatDialog,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<EdicionDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      dialogRef.disableClose = true;
      this.notifier = notifierService;  
      this.idVehiculo = data.IdVehiculo;
      this.idConcesionario = data.IdConcesionario;
      this.nombreConcesionarioValue = data.nombreConcesionario;
      this.marcaValue = data.marca;
      this.submarcaValue = data.submarca;
      this.modeloValue = data.modelo;
      this.piloto = data.Piloto;

    }

  ngOnInit(): void {

    this.getDocumentosVehiculo(this.idVehiculo);

    //Validación de campos en pantalla
    this.frmStepFive = this.formBuilder.group({
      'IdDocumento': [''],
      'Documento': [''],
      'IdVehiculo': [''],
      'NombreArchivo': [''],
      'Faltante': ['']
    });
 }

  onSubmit() {
    if (this.frmStepFive.valid) {
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }

  //Abre la imagen del archivo 
  verPDF(row: any) {

    if (row.Faltante == 1) {
      this.openDialogSinPDF(row);      
    } else {
      this.openDialogPDF(row.NombreArchivo);
    }

  }

  //Abre un aviso para la carga del documento
  openDialogSinPDF(row: any) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '30%',
      //height: '20%',
      disableClose: true,
      data: { documento: row.Documento }
    });
    // const snack = this.snackBar.open('Snack bar open before dialog');
    dialogRef.afterClosed().subscribe(res => {

    });
  }

  //Abre modal visualizar el documento
  openDialogPDF(archivoPDF: string): void {

    const dialogRef = this.dialog.open(DocViewerComponent, {
      width: '60%',
      height: '80%',
      disableClose: true,
      data: { archivoPDF: archivoPDF }
    });
    dialogRef.afterClosed().subscribe(res => {

    });
  }


  //Consulta los documentos del vehículo
  getDocumentosVehiculo(idVehiculo: number) {

    this.documentosService.getDocumentosVehiculo(idVehiculo)
      .pipe(first())
      .subscribe(dataList => {

          this.dataSource = new MatTableDataSource(dataList.documentos);

          // Assign the data to the data source for the table to render
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
        error => {

        });
  }

  //Adjunta los archivos 
  onFileSelected(e: any, row: any) {
    this.uploadedFiles = e.target.files;

    if (this.isFileAllowedPDF(this.uploadedFiles[0].name)) {

      const formData = new FormData();
      formData.append('Documento', this.uploadedFiles[0], this.uploadedFiles[0].name),
      formData.append('IdVehiculo', row.IdVehiculo),
      formData.append('IdDocumento', row.IdDocumento),
      formData.append('IdConcesionario', this.idConcesionario)

      this.documentosService.postGuardaDocumentoPDF(formData)
        .pipe(first())
        .subscribe(
          data => {

            if (data.estatus) {
              //this.success(data.mensaje);
              this.notifier.notify('success', data.mensaje, '');
              this.getDocumentosVehiculo(row.IdVehiculo);          
            } else if (!data.estatus) {
              //this.warn(data.mensaje);
              this.notifier.notify('warning', data.mensaje, '');
            } 
          },
          error => {
            //this.error(error);
            this.notifier.notify('error', error, '');
          });

    } else {

      this.notifier.notify('warning', 'El archivo no corresponde a las extensiones .pdf, .jpeg, .png, .jpg', '');
      //this.warn("El archivo no corresponde a la extensión .pdf");
    }
  }

  //Valida la extensión del archivo PDF
  isFileAllowedPDF(fileName: string) {

    let isFileAllowed = false;
    const allowedFiles = ['.pdf', '.jpeg', '.png', '.jpg'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  mostrarDialogo(): void {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `¿Desea validar todos los documentos?`,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          
        } else {
          
        }
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

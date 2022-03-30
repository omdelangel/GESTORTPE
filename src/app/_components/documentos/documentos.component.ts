import { Component, OnInit, Inject, Optional, ViewChild  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { DocumentosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../../_alert';
import { DocumentosVehiculo } from '../../_models';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog';
import { DocViewerComponent } from '../doc-viewer'; 
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Row } from 'jspdf-autotable';
import { NotifierService } from 'angular-notifier';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
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


  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private documentosService: DocumentosService,
    public dialog: MatDialog,
    notifierService: NotifierService) { 

      this.notifier = notifierService;  

    }

  ngOnInit(): void {

    //this.clear();
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
      width: '50%',
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

        if (dataList.estatus) {
          this.dataSource = new MatTableDataSource(dataList.documentos);

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "visible";

          var elemTable = document.getElementById('divTable');
          elemTable!.style.visibility = "visible";

          // Assign the data to the data source for the table to render
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        } else {

          var elemDiv = document.getElementById('divTitle');
          elemDiv!.style.visibility = "hidden";

          var elemTable = document.getElementById('divTable');
          elemTable!.style.visibility = "hidden";

        }
      },
        error => {

          this.notifier.notify('error', error, '');
        });
  }

  //Adjunta los archivos 
  onFileSelected(e: any, row: any) {
    //this.clear();
    this.uploadedFiles = e.target.files;

    if (this.isFileAllowedPDF(this.uploadedFiles[0].name)) {

      console.log(this.uploadedFiles[0].name)

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

      //this.warn("El archivo no corresponde a la extensión .pdf");
      this.notifier.notify('warning', 'El archivo no corresponde a las extensiones .pdf, .jpeg, .png', '');
    }
  }

  //Valida la extensión del archivo PDF
  isFileAllowedPDF(fileName: string) {

    let isFileAllowed = false;
    const allowedFiles = ['.pdf', '.jpeg', '.png'];
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

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

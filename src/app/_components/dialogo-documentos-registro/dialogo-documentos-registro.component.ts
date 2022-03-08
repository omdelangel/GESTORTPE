import { Component, OnInit, Inject, Optional, ViewChild  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { DocumentosService} from '../../_services';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
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
  selector: 'app-dialogo-documentos-registro',
  templateUrl: './dialogo-documentos-registro.component.html',
  styleUrls: ['./dialogo-documentos-registro.component.scss']
})
export class DialogoDocumentosRegistroComponent implements OnInit {

  private readonly notifier: NotifierService;
  

  displayedColumns = ['select', 'Documento', 'NombreArchivo', 'Faltante', 'Observaciones', 'archivoPDF', 'actions'];
  dataSource!: MatTableDataSource<DocumentosVehiculo>;
  selection = new SelectionModel<DocumentosVehiculo>(true, []);


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
  editable: boolean = true;


  constructor(private formBuilder: FormBuilder,
    private documentosService: DocumentosService,
    public dialog: MatDialog,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<DialogoDocumentosRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      dialogRef.disableClose = true;
      this.notifier = notifierService;  
      this.idVehiculo = data.IdVehiculo;
      this.idConcesionario = data.IdConcesionario;
      this.nombreConcesionarioValue = data.nombreConcesionario;
      this.marcaValue = data.marca;
      this.submarcaValue = data.submarca;
     this.modeloValue = data.modelo;

    }

  ngOnInit(): void {

    this.getDocumentosContrato(this.idVehiculo);

    //Validación de campos en pantalla
    this.frmStepFive = this.formBuilder.group({
      'IdDocumento': [''],
      'Documento': [''],
      'IdVehiculo': [''],
      'NombreArchivo': [''],
      'Faltante': [''],
      'Observaciones': ['']
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


  //Consulta los documentos y contratos
  getDocumentosContrato(idVehiculo: number) {

    this.documentosService.getDocumentosContrato(idVehiculo)
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
              this.getDocumentosContrato(row.IdVehiculo);          
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

      this.notifier.notify('warning', 'El archivo no corresponde a la extensión .pdf', '');
      //this.warn("El archivo no corresponde a la extensión .pdf");
    }
  }

  //Valida la extensión del archivo PDF
  isFileAllowedPDF(fileName: string) {

    let isFileAllowed = false;
    const allowedFiles = ['.pdf'];
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

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}
}
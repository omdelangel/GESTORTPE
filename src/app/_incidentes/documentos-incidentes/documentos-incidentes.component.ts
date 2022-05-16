import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IncidenteService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';
import { DocumentoEvidencia } from 'src/app/_models';
import {SelectionModel} from '@angular/cdk/collections';

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
  public files: any[] = [];
  idEvidencia: number = 0;
  idSiniestro: number = 0;
  idIncidenteSiniestro: string = "";
  concesionario: string = "";
  vehiculo: string = "";
  reactiveForm!: FormGroup;

  displayedColumns = ['IdEvidencia', 'IdSiniestro', 'ArchivoEvidencia', 'actions' ];
  dataSource!: MatTableDataSource<DocumentoEvidencia>;
  selection = new SelectionModel<DocumentoEvidencia>(true, []);


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder,
    public incidenteService: IncidenteService,
    notifierService: NotifierService,
    public dialogRef: MatDialogRef<DocumentosIncidentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 


      this.notifier = notifierService;
      this.idSiniestro = data.IdTipoSiniestro;
      this.idIncidenteSiniestro = data.IdIncidenteSiniestro;
      this.concesionario = data.Concesionario;
      this.vehiculo = data.Vehiculo;

    }

  ngOnInit(): void {

    this.getDocumentosEvidencia(this.idSiniestro);

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

  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }

  onFileChange(pFileList: File[]){


    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    console.log("this.files");
    console.log(this.files);

    const fileListAsArray = Array.from(pFileList);
    fileListAsArray.forEach((item, i) => {

      const formData = new FormData();
      formData.append('ArchivoEvidencia', item),
      formData.append('IdEvidencias', String(this.idEvidencia)),
      formData.append('IdSiniestro', String(this.idSiniestro))

      this.incidenteService.postGuardaEvidencias(formData)
      .pipe(first())
      .subscribe(
        data => {

          if (data.estatus) {
            this.notifier.notify('success', data.mensaje, '');
            this.getDocumentosEvidencia(this.idSiniestro);
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

  getDocumentosEvidencia(idSiniestro: number){

    this.incidenteService.getDocumentosEvidencia(9)
    .pipe(first())
    .subscribe(dataList => {
      
      console.log("dataList");
      console.log(dataList);

      this.dataSource = new MatTableDataSource(dataList.Evidencias);

      // Assign the data to the data source for the table to render
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {

      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }


}



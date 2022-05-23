import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { DocumentoEvidenciaSeguro } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocViewerComponent } from '../../_components/doc-viewer'; 
import { IncidenteService } from 'src/app/_services';
import { DialogoConfirmacionIncidenteComponent } from '../dialogo-confirmacion-incidente';
import { first } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialogo-dictamen-seguro',
  templateUrl: './dialogo-dictamen-seguro.component.html',
  styleUrls: ['./dialogo-dictamen-seguro.component.scss']
})
export class DialogoDictamenSeguroComponent implements OnInit {



  private readonly notifier: NotifierService;

  displayedColumns = ['ArchivoResolucionSeguro', 'actions'];
  dataSource!: MatTableDataSource<DocumentoEvidenciaSeguro>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
  existentes:number = 0;

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
      'dictamen': [({ value: "", disabled: true }), Validators.required],
      'ArchivoResolucionSeguro': [''],
    });

    this.getDocumentoSeguro(this.idIncidenteSiniestro, this.idVehiculo);
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

    this.existentes = 0;
    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    console.log(" onFileChangeSeguro ")
    console.log(this.files.length)
    console.log(this.existentes)

    if(this.files.length + this.existentes == 1 ){

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
              this.getDocumentoSeguro(this.idIncidenteSiniestro, this.idVehiculo);
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

  getDocumentoSeguro(idIncidenteSiniestro: number, idVehiculo: number) {

    this.incidenteService.getDocumentoSeguro(idIncidenteSiniestro, idVehiculo)
      .pipe(first())
      .subscribe(dataList => {

        if (dataList.estatus) {
          this.documentoEvidencia = dataList.siniestro;
          console.log("getDocumentoSeguro")
          console.log(dataList)
          console.log(this.existentes)


          if (this.documentoEvidencia[0].ArchivoResolucionSeguro == "" || this.documentoEvidencia[0].ArchivoResolucionSeguro == null) {
            this.existentes = 0
            this.f.dictamen.setValue("");            
            this.f.dictamen.disable();
            this.dataVal = false;
          } else {
            this.existentes = dataList.siniestro.length
            this.f.dictamen.enable();
            this.dataVal = true;
          }
          console.log(this.existentes)
         
          this.dataSource = new MatTableDataSource(this.documentoEvidencia);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        } else {
          this.existentes = 0;
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
        data: { archivoPDF: archivoPDF.ArchivoResolucionSeguro }
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
        data: `Se eliminará el archivo de dictamen: ` + archivoPDF.ArchivoResolucionSeguro,
        width: '25%'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.eliminarEvidenciaSeguro();

        } else {

        }
      });
  }
  

  eliminarEvidenciaSeguro() {

    this.incidenteService.postEliminaDictamenSeguro(this.idVehiculo, this.idIncidenteSiniestro,)
      .pipe(first())
      .subscribe(dataList => {

        if (dataList.estatus) {
          this.dataVal = false;
          this.existentes = 0;
          this.f.dictamen.disable();
          this.getDocumentoSeguro(this.idIncidenteSiniestro, this.idVehiculo);
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

    console.log("confirmaDictamen entrada")
    console.log(this.idVehiculo)
    console.log(this.idIncidenteSiniestro)
    console.log(this.f.dictamen.value)
    console.log(this.f.dictamen.valid)
    this.submitted = true;

    if (this.reactiveForm.invalid) {
      return;
    }
    
    console.log("confirmaDictamen")
    console.log(this.idVehiculo)
    console.log(this.idIncidenteSiniestro)
    console.log(this.f.dictamen.value)

    if (this.f.dictamen.value == ""){
      this.notifier.notify('warning', "Favor de seleccionar una opción válida");
    }else{
    this.incidenteService.postGuardaDictamen(this.idVehiculo, this.idIncidenteSiniestro, this.f.dictamen.value)
    .pipe(first())
    .subscribe(dataList => {

      if (dataList.estatus) {
        console.log("confirmaDictamen regresa")
        console.log(dataList)
        this.dataVal = false;
        this.existentes = 0;
        this.f.dictamen.disable();
        this.getDocumentoSeguro(this.idIncidenteSiniestro, this.idVehiculo);
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


}

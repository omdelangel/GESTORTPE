import { Component, OnInit, ViewChild, Inject, Optional, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentosComponent } from '../documentos';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent  {


  //pdfSrc = "./assets/F0000000343.pdf";
  pdfSrc!: string;
  title = "pdfEditor";

  constructor(
    
    public dialogRef: MatDialogRef<DocumentosComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.pdfSrc = "./assets/documentosPDF/" + data.archivoPDF;
      dialogRef.disableClose = true;
 
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}

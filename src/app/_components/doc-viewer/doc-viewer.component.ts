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
  pdfSrcIMG!: string;
  pdfSrcPDF!: string;
  file: string = "";
  title = "pdfEditor";
  visorImg: boolean = false;
  visorPDF: boolean = false;


  constructor(
    
    public dialogRef: MatDialogRef<DocumentosComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.file = data.archivoPDF;
      var ext = this.file.split(".").pop();

      if (ext == "png" || ext == "jpeg" || ext == "jpg"){

        this.visorImg = true;
         this.pdfSrcIMG = "./assets/documentosPDF/" + data.archivoPDF;

      } else if (ext == "pdf") {

        this.visorImg = false;
        this.pdfSrcPDF = "./assets/documentosPDF/" + data.archivoPDF;

      }
    
      dialogRef.disableClose = true;
 
  }


  onNoClick(): void {
    this.dialogRef.close();
  }






}

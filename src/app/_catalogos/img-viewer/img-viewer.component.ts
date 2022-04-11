import { Component, OnInit, ViewChild, Inject, Optional, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})

export class ImgViewerComponent {

  //pdfSrc = "./assets/documentosPDF/cita_1649698874199.pdf";
  pdfSrcIMG!: string;
  pdfSrcPDF!: string;
  file: string = "";
  title = "imgEditor";
  visorImg: boolean = false;
  visorPDF: boolean = false;


  constructor(
       
  public dialogRef          : MatDialogRef<ImgViewerComponent>,
  @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.file       = data.archivoIMG;

      var ext         = this.file.split(".").pop();

      if (ext == "png" || ext == "jpeg" || ext == "jpg"){

          this.visorImg = true;
          this.pdfSrcIMG = "./assets/documentosPDF/" + data.archivoIMG;
//          this.pdfSrcIMG = this.pdfSrc;

      } else if (ext == "pdf") {

         this.visorImg = false;
         this.pdfSrcPDF = "./assets/documentosPDF/" + data.archivoIMG;
  //       this.pdfSrcPDF = this.pdfSrc;
      }
    
     dialogRef.disableClose = true;

  }


  onNoClick(): void {
    this.dialogRef.close();
  }



}

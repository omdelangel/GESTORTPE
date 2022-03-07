import { Component, OnInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReimpresionQRComponent } from '../reimpresion-qr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent  {
  @ViewChild(PdfViewerComponent, {static: false})
  private pdfComponent!: PdfViewerComponent;
  @ViewChild('qrcode') htmlData:ElementRef | undefined;

  idConcesionario: number = 0;
  nombreConcesionario: string = "";
  nombreOperador: string = "";
  idVehiculo: number = 0;
  idOperador: number = 0;
  myAngularQrcode: string = "";
  qrvalue = 'embedded qr';



  constructor(
    public dialogRef: MatDialogRef<ReimpresionQRComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.idConcesionario = data.idConcesionario;
    this.nombreConcesionario = data.nombreConcesionario;
    this.nombreOperador = data.nombreOperador;
    this.idOperador = data.idOperador;
    this.idVehiculo = data.idVehiculo;
    this.myAngularQrcode = "{" + '"' + "idConcesionario" + '":' + '"' +this.idConcesionario + '"' + ',' + '"' + "idVehiculo" + '":' + '"' +this.idVehiculo + '"' +',' + '"' + "idOperador" + '":' + '"'+ this.idOperador + '"' +"}";

  }


  public openPDF():void {
    let DATA = document.getElementById('qrcode')!;
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 50;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'letter');

        var img = new Image();
        img.src = 'assets/images/logo-cambia.jpg';
        let position = 0;
        PDF.addImage(img, 'jpg', 120, 10, 80, 30);  
        PDF.text("Gestor de Gas LP", 14, 15); 
        PDF.text("Operador: " + this.nombreOperador, 50, 60);
        //PDF.addImage(FILEURI, 'PNG', 30, 65, fileWidth, fileHeight)
        PDF.addImage(FILEURI, "PNG", 30, 65, 160, 130);
        
        PDF.save(this.idConcesionario + "_" + this.idVehiculo + '.pdf');
    });     
    }

}

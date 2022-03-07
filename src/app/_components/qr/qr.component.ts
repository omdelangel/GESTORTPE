import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QRComponent implements OnInit {

  myAngularQrcode: string;
  qrvalue = 'embedded qr';

  constructor() {

    this.myAngularQrcode = "Concesionario: 9898989899" + '\n' + "Número Serie: 89798798798" +'\n' +  "Número Operador: 86876876876876876";
 
   }

  ngOnInit(): void {
  }

  getBase64Image(img: any) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0)
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  download() {

    const qrcode = document.getElementById('qrcode');
    let doc = new jsPDF();

    var img = new Image()
    img.src = 'assets/images/Captura.JPG'
    doc.addImage(img, 'jpg', 150, 10, 50, 30)
    doc.text("Gestor de Gas LP", 14, 15);
    doc.text("Operador: Christian González", 50, 60);

    let imageData= this.getBase64Image(qrcode?.firstChild?.firstChild);
    doc.addImage(imageData, "JPG", 30, 65, 150, 150);

    doc.save('FirstPdf.pdf');
  }
}

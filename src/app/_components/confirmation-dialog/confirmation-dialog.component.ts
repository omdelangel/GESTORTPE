import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { ReimpresionQRComponent } from '../reimpresion-qr';
import { DocumentosComponent } from '../documentos';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  documento: string = "";

  constructor(
    public dialogRef: MatDialogRef<DocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.documento = data.documento;

     }

  ngOnInit(): void {
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogo-confirma-documentos',
  templateUrl: './dialogo-confirma-documentos.component.html',
  styleUrls: ['./dialogo-confirma-documentos.component.scss']
})
export class DialogoConfirmaDocumentosComponent implements OnInit {

  public fName: string;
  public fIndex: any;

  constructor(private modalRef: MatDialogRef<DialogoConfirmaDocumentosComponent>) { }

  ngOnInit() {
  }

  confirm() {
    this.modalRef.close(this.fIndex);
  }
  cancel() {
    this.modalRef.close();
  }

}
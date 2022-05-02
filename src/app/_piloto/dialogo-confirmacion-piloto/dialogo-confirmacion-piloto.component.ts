import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogo-confirmacion-piloto',
  templateUrl: './dialogo-confirmacion-piloto.component.html',
  styleUrls: ['./dialogo-confirmacion-piloto.component.scss']
})
export class DialogoConfirmacionPilotoComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogoConfirmacionPilotoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 

      dialogo.disableClose = true;

    }

    noConfirma(): void {
      this.dialogo.close("NO");
    }
    confirmado(): void {
      this.dialogo.close("SI");
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogo.close("CIERRA");
  }

}
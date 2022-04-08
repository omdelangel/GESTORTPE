import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacion-piloto',
  templateUrl: './dialogo-confirmacion-piloto.component.html',
  styleUrls: ['./dialogo-confirmacion-piloto.component.scss']
})
export class DialogoConfirmacionPilotoComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogoConfirmacionPilotoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { 

      dialogo.disableClose = true;

    }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }

}
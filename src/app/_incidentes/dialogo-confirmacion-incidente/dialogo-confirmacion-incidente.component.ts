import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacion-incidente',
  templateUrl: './dialogo-confirmacion-incidente.component.html',
  styleUrls: ['./dialogo-confirmacion-incidente.component.scss']
})
export class DialogoConfirmacionIncidenteComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogoConfirmacionIncidenteComponent>,
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
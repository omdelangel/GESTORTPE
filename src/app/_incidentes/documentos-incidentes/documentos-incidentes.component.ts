import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documentos-incidentes',
  templateUrl: './documentos-incidentes.component.html',
  styleUrls: ['./documentos-incidentes.component.scss']
})
export class DocumentosIncidentesComponent implements OnInit {
  public files: any[] = [];

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onFileChange(pFileList: any){
    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }


}



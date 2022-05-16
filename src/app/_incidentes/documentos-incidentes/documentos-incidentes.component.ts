import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IncidenteService } from 'src/app/_services';

@Component({
  selector: 'app-documentos-incidentes',
  templateUrl: './documentos-incidentes.component.html',
  styleUrls: ['./documentos-incidentes.component.scss']
})
export class DocumentosIncidentesComponent implements OnInit {
  public files: any[] = [];
  idEvidencias: number = 0;
  idSiniestro: number = 0;

  constructor(private _snackBar: MatSnackBar, 
    public dialog: MatDialog, public incidenteService: IncidenteService) { 





    }

  ngOnInit(): void {
  }

  onFileChange(pFileList: File[]){


    this.files = Object.keys(pFileList).map(key => pFileList[Number(key)]);

    console.log("this.files");
    console.log(this.files);

    const fileListAsArray = Array.from(pFileList);
    fileListAsArray.forEach((item, i) => {

      const formData = new FormData();
      formData.append('ArchivoEvidencia', item),
      formData.append('IdEvidencias', String(this.idEvidencias)),
      formData.append('IdSiniestro', String(this.idSiniestro))

      


     
     });

     
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }


}



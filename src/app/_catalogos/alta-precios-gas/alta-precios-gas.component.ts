import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Municipios } from 'src/app/_models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-alta-precios-gas',
  templateUrl: './alta-precios-gas.component.html',
  styleUrls: ['./alta-precios-gas.component.scss']
})
export class AltaPreciosGasComponent implements OnInit {
  private readonly notifier: NotifierService;

  //Columnas en Tabla de consulta
  displayedColumns = ['Region', 'Entidad', 'Municipio', 'PrecioKg', 'PrecioLtr', 'actions']
  dataSource!: MatTableDataSource<Municipios>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm!: FormGroup;
  idEntidadValue: string = "";
  nombreEValue: string = "";

  constructor(notifierService: NotifierService,
    public dialogRef: MatDialogRef<AltaPreciosGasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.notifier = notifierService;
      this.idEntidadValue = data.idEntidad;
      this.nombreEValue = data.nombreE;


     }

  ngOnInit(): void {
  }

  get f() { return this.reactiveForm.controls; }


  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)


    } else {
      return
    }
  }


  editar(e: any){


  }

    //Cierra la pantalla
    onNoClick(): void {
      this.dialogRef.close();
    }

}

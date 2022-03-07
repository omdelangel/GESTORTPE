import { Component, OnInit, Inject } from '@angular/core';
import { CitasService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AltacitaComponent } from '../altacita';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-horacita-dialog',
  templateUrl: './horacita-dialog.component.html',
  styleUrls: ['./horacita-dialog.component.scss']
})
export class HoracitaDialogComponent implements OnInit {

  horas: any[] = [];
  reactiveForm!: FormGroup;
  idTaller: number = 0;
  fecha: string = "";
  hora: string = "";

  constructor(private citasService: CitasService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AltacitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.idTaller = data.idTaller;
      this.fecha = data.fecha;
      this.getHorariosDisponibles(this.idTaller, this.fecha);
    }

  ngOnInit(): void {

    this.reactiveForm = this.formBuilder.group({
      'HoraDisponible': ['', Validators.required]
    }); 

  }

  get f() { return this.reactiveForm.controls; }

  onSubmit() {
    if (this.reactiveForm.valid) {
      //console.log(this.reactiveForm.value)

    } else {
      return
    }
  }

  //obtiene las horas disponibles
  getHorariosDisponibles(idTaller: any, fecha: string) {
    this.citasService.getCatalogoHorasDisponibles(idTaller, fecha)
      .pipe(first())
      .subscribe(data => {
        this.horas = data.HorasDisponibles;
      },
        error => {
        });
  }


  //Selecciona la hora y cierra la modal
  seleccionaHora() {

    this.hora = this.f.HoraDisponible.value;
    this.dialogRef.close(this.hora);

  }

}

import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EdicionconcesionarioComponent } from '../edicionconcesionario';
import { EdicionvehiculoComponent } from '../edicionvehiculo';
import { EdicionpropietarioComponent } from '../edicionpropietario';
import { ConcesionarioService, VehiculoService, PropietarioService} from 'src/app/_services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-preregistro-edicion-dialog',
  templateUrl: './preregistro-edicion-dialog.component.html',
  styleUrls: ['./preregistro-edicion-dialog.component.scss']
})
export class PreregistroEdicionDialogComponent implements OnInit {

  subscription!: Subscription;
  valueAsigna: boolean = false;
  valueVehiculo: number = 0;
  idConcesionarioValue: number = 0;
  idVehiculoValue: number = 0;
  idPropietarioValue: number = 0;

  
  @ViewChild(EdicionconcesionarioComponent) edicionconcesionarioComponent!: EdicionconcesionarioComponent;
  @ViewChild(EdicionvehiculoComponent) edicionvehiculoComponent!: EdicionvehiculoComponent;
  @ViewChild(EdicionpropietarioComponent) edicionpropietarioComponent!: EdicionpropietarioComponent;


  constructor(private _formBuilder: FormBuilder,
    private concesionarioService: ConcesionarioService,
    private vehiculoService: VehiculoService,
    private propietarioService: PropietarioService,
    public dialogRef: MatDialogRef<PreregistroEdicionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){

      dialogRef.disableClose = true;
      this.idConcesionarioValue = data.IdConcesionario;
      this.idVehiculoValue = data.IdVehiculo;
      this.idPropietarioValue = data.IdPropietario;

        
    //subscription para ocultar y mostrar la pestaña de propietarios
    this.subscription = this.concesionarioService.onView().subscribe(message => {
      if (message.text != undefined) {
        this.valueAsigna = this.edicionconcesionarioComponent.asigna;
        this.edicionvehiculoComponent.asigna = this.edicionconcesionarioComponent.asigna;
      }
    });

     //subscription para obtener el idVehiculo
     this.subscription = this.concesionarioService.onIdConceVehi().subscribe(idConceVehi => {

      if (idConceVehi.idVehiculo != undefined ){
        this.edicionvehiculoComponent.getVehiculo(idConceVehi.idVehiculo);
      }

      this.edicionvehiculoComponent.idConcesionario = idConceVehi.idConcesionario;
      this.edicionvehiculoComponent.idVehiculo = idConceVehi.idVehiculo;    

    });

    //subscription para obtener el idVehiculo y idPropietario
    this.subscription = this.vehiculoService.onIdVehiProp().subscribe(idVehiProp => {

      this.edicionpropietarioComponent.getPropietarioVehiculo(idVehiProp.idPropietario, idVehiProp.idVehiculo);

    });
 
    }

  ngOnInit() {  

  }


  get edicionconcesionario() {
     return this.edicionconcesionarioComponent ? this.edicionconcesionarioComponent.frmStepOne : null;
  }

  get edicionvehiculo() {
     return this.edicionvehiculoComponent ? this.edicionvehiculoComponent.frmStepTwo : null;
  }

  get edicionpropietario() {
    return this.edicionpropietarioComponent ? this.edicionpropietarioComponent.frmStepThree : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  guardaConcesionario(){
    this.edicionconcesionarioComponent.guardarConcesionario();
  }

  guardaVehiculo(){
    this.edicionvehiculoComponent.guardarVehiculo();
  }

  guardaPropietario(){
    this.edicionpropietarioComponent.guardarPropietario();
  }


}
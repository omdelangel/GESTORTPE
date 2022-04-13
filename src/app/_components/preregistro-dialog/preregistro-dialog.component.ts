import { Component, ViewChild, OnInit, Inject, ChangeDetectorRef, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Form } from '@angular/forms';
import { AltaconcesionarioComponent } from '../altaconcesionario';
import { AltavehiculoComponent } from '../altavehiculo'; 
import { AltapropietarioComponent } from '../altapropietario';
import { AltacitaComponent } from '../altacita';
import { DocumentosComponent } from '../documentos';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConcesionarioService, VehiculoService, PropietarioService} from 'src/app/_services';
import { TalleresComponent } from '../talleres';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-preregistro-dialog',
  templateUrl: './preregistro-dialog.component.html',
  styleUrls: ['./preregistro-dialog.component.scss']
})
export class PreregistroDialogComponent implements OnInit {

  subscription!: Subscription;
  valueAsigna: boolean = false;
  valueVehiculo: number = 0;
  idConcesionarioValue: number = 0;
  piloto: boolean = false;

  
  @ViewChild(AltaconcesionarioComponent) altaconcesionarioComponent!: AltaconcesionarioComponent;
  @ViewChild(AltavehiculoComponent) altavehiculoComponent!: AltavehiculoComponent;
  @ViewChild(AltapropietarioComponent) altapropietarioComponent!: AltapropietarioComponent;
  @ViewChild(TalleresComponent) talleresComponent!: TalleresComponent;
  @ViewChild(DocumentosComponent) documentosComponent!: DocumentosComponent;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private concesionarioService: ConcesionarioService,
    private vehiculoService: VehiculoService,
    private propietarioService: PropietarioService,
    public dialogRef: MatDialogRef<PreregistroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){

      
      
    dialogRef.disableClose = true;
    //subscription para ocultar y mostrar la pestaña de propietarios
    this.subscription = this.concesionarioService.onView().subscribe(message => {
      this.valueAsigna = this.altaconcesionarioComponent.asigna;  
      this.piloto = this.altaconcesionarioComponent.piloto;  
      this.talleresComponent.pilotoValue = this.piloto;  
    });

     //subscription para obtener el idConcesionario
     this.subscription = this.concesionarioService.onIdConce().subscribe(idConce => {
      this.altavehiculoComponent.idConcesionario = idConce.idConcesionario;
      this.documentosComponent.idConcesionario = idConce.idConcesionario;
      this.talleresComponent.idConcesionario = idConce.idConcesionario;
      this.talleresComponent.nombreConcesionario = idConce.nombreConce;

    });

    //subscription para obtener el idVehiculo
    this.subscription = this.vehiculoService.onIdVehi().subscribe(idVehi => {
      this.talleresComponent.idVehiculo = idVehi.idVehiculo;
      if (this.valueAsigna) {
        this.altapropietarioComponent.idVehiculo = idVehi.idVehiculo;
      }
      this.documentosComponent.getDocumentosVehiculo(idVehi.idVehiculo);

    });

     //subscription para obtener el idVehiculo de Propietario a Documentos
     this.subscription = this.propietarioService.onIdPrope().subscribe(idVehi => {
      this.documentosComponent.getDocumentosVehiculo(idVehi.idVehiculo); 
    });
  
    }

  ngOnInit() {  

  }

  selectionChange(e: any) {

    switch (e.selectedIndex) {
      case 0:
        //this.altaconcesionarioComponent.guardarConcesionario();
        break;
      case 1:
        this.altaconcesionarioComponent.guardarConcesionario();
        break;
      case 2:
        this.altavehiculoComponent.guardarVehiculo();
        break;
      case 3:
          if (this.valueAsigna) {
            this.altapropietarioComponent.guardarPropietario();
          }
        break;
      default:
        // 
        break;
    }
  }


  get altaconcesionario() {
    //return this.altaconcesionarioComponent.frmStepOne; 
     return this.altaconcesionarioComponent ? this.altaconcesionarioComponent.frmStepOne : null;
  }

  get altavehiculo() {
    //return this.altavehiculoComponent.frmStepTwo;
     return this.altavehiculoComponent ? this.altavehiculoComponent.frmStepTwo : null;
  }

  get altapropietario() {
    //return this.altapropietarioComponent.frmStepThree;
    return this.altapropietarioComponent ? this.altapropietarioComponent.frmStepThree : null;
  }

  get documentos() {
    //return this.altapropietarioComponent.frmStepThree;
    return this.documentosComponent ? this.documentosComponent.frmStepFive : null;
  }

  get altacita(){
    //return this.altacitaComponent.frmStepFour;
    return this.talleresComponent ? this.talleresComponent.frmStepFour : null;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

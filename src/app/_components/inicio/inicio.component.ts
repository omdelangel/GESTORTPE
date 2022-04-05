import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  dataPerfil: any = "";
  perfil: number = 0;
  viewDashboard: boolean = false;
  viewBienvenidos: boolean = false;

  constructor() { 

     //Obtiene el valor del perfil para la revisión de los documentos
     this.dataPerfil = sessionStorage.getItem('usuario');
     let valores = JSON.parse(this.dataPerfil);
     this.perfil = valores.IdPerfil;

     if (this.perfil == 1 || this.perfil == 6) {

      this.viewDashboard = true;
      this.viewBienvenidos = false;
 
    } else {

      this.viewDashboard = false;
      this.viewBienvenidos = true;
 
    }

  }

  ngOnInit(): void {
  }

}

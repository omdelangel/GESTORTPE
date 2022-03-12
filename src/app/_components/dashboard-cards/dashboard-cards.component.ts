import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DashboardService } from './../../_services/dashboard.service';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  public totalContratos : number;
  public contratosNuevos : number;
  public vehiculosConsumo : number;
  public litrosConsumo : number;
  public importeConsumo : number;
  public totalAhorro : number;
  public totalBeneficios : number;
  public LitrosPeriodo : number;
  public importePeriodo : number;
  public ahorroPeriodo : number;
  public beneficiosPeriodo : number;
  public vehiculosPeriodo : number;
  public concesionariosFR : number;
  public litrosFR : number;
  public totalAhorroFR : number;
  public litrosPeriodoFR : number;
  public ahorroPeriodoFR : number;

  constructor(private dash: DashboardService) { 
    this.totalContratos = 0;
    this.contratosNuevos = 0;
    this.vehiculosConsumo = 0;
    this.litrosConsumo = 0;
    this.importeConsumo = 0;
    this.totalAhorro = 0;
    this.totalBeneficios = 0;
    this.LitrosPeriodo = 0;
    this.importePeriodo = 0;
    this.ahorroPeriodo = 0;
    this.beneficiosPeriodo = 0;
    this.vehiculosPeriodo = 0;
    this.concesionariosFR = 0;
    this.litrosFR = 0;
    this.totalAhorroFR = 0;
    this.litrosFR = 0;
    this.litrosPeriodoFR = 0;
    this.ahorroPeriodoFR = 0;

  }

  ngOnInit(): void {
    this.dash.obtenDashboard(2)
    .pipe(first()).subscribe((dataList : any) => {
      console.log("Respuesta : "+ JSON.stringify(dataList['datos']));
      this.totalContratos = dataList['datos'][0][0].Acumulados;    //map((res : any) => res.Citas);
      this.contratosNuevos =  dataList['datos'][0][0].Nuevos;

      console.log("totalContratos: " + this.totalContratos);
      console.log("contratosNuevos: " + this.contratosNuevos);

      this.vehiculosConsumo =  dataList['datos'][1][0].VehiculoConsumo;
      this.litrosConsumo =  dataList['datos'][1][0].LitrosConsumo;
      this.importeConsumo =  dataList['datos'][1][0].ImporteConsumo;
      this.totalAhorro =  dataList['datos'][1][0].TotalAhorro;
      this.totalBeneficios =  dataList['datos'][1][0].TotalBeneficios;
      this.LitrosPeriodo =  dataList['datos'][1][0].LitrosPeriodo;
      this.importePeriodo =  dataList['datos'][1][0].ImportePeriodo;
      this.ahorroPeriodo =  dataList['datos'][1][0].AhorroPeriodo;
      this.beneficiosPeriodo =  dataList['datos'][1][0].BeneficiosPeriodo;
      this.vehiculosPeriodo =  dataList['datos'][1][0].VehiculosPeriodo;
      this.concesionariosFR =  dataList['datos'][2][0].Consecionarios;
      this.litrosFR =  dataList['datos'][2][0].Litros;
      this.totalAhorroFR =  dataList['datos'][2][0].TotalAhorro;
      this.litrosPeriodoFR =  dataList['datos'][2][0].LitrosPeriodo;
      this.ahorroPeriodoFR =  dataList['datos'][2][0].AhorroPeriodo;


          

    })
  }

}

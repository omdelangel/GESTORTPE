import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { DashboardService } from '../../_services/dashboard.service';
import { Chart, registerables } from 'node_modules/chart.js';


@Component({
  selector: 'app-contratos-noconsumo',
  templateUrl: './contratos-noconsumo.component.html',
  styleUrls: ['./contratos-noconsumo.component.scss']
})
export class ContratosNoconsumoComponent implements OnInit {
  private dataGraph = [];
  private dimsGraph = [];

  constructor(private dash : DashboardService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dash.obtenDashboard(6).
    pipe(first()).subscribe((dataList : any) => {
      this.dataGraph = dataList['datos'][0].map((res : any) => res.Vehiculos);
      this.dimsGraph = dataList['datos'][0].map((res : any) => res.Clasifica);

      const ctx = 'noConsumo-chart';
      const porcentaje = ( 100 * this.dataGraph[0] / (this.dataGraph[0] + this.dataGraph[1]) );

      const chart =  new Chart(ctx, {
        type: 'bar',
        data: {
          labels : this.dimsGraph,
          datasets : [
            {
              label : "Vehiculos-Consumo",
              data : this.dataGraph,
              //backgroundColor: ["rgb(67, 188, 205)", "rgb(157, 157, 157)"],
              backgroundColor: ["Red", "rgb(128, 188, 0)"],

            }
          ]
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
              display: false
            },
            title: {
              position : 'top',
              display: true,
              text: 'Porcentaje de vehículos sin consumo: ' + porcentaje.toFixed(2)+'%',
            },

            tooltip: {
              yAlign : 'bottom',
              displayColors : false,
            }
          }
        }
      })
    })
  }

}

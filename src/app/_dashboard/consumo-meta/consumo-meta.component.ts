import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { DashboardService } from '../../_services/dashboard.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { FooterRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-consumo-meta',
  templateUrl: './consumo-meta.component.html',
  styleUrls: ['./consumo-meta.component.scss']
})
export class ConsumoMetaComponent implements OnInit {
  private dataGraph = [];
  private dimsGraph = [];

  constructor(private dash : DashboardService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.dash.obtenDashboard(7).
    pipe(first()).subscribe((dataList : any) => {
      this.dataGraph = dataList['datos'][0].map((res : any) => res.Valor);
      this.dimsGraph = dataList['datos'][0].map((res : any) => res.Concepto);

      const ctx = 'consumoMeta-chart';
      const porcentaje = ( 100 * this.dataGraph[1] / this.dataGraph[0]); 

      const chart =  new Chart(ctx, {
        type: 'bar',
        data: {
          labels : this.dimsGraph,
          datasets : [
            {
              label : '', //"Consumos Vs Meta",
              data : this.dataGraph,
              backgroundColor: ["rgb(148, 104, 199)", "rgb(67, 188, 205)"],
              
            }
          ]
        },
        
        options: {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
              borderRadius: 15,
              borderSkipped: false,
            }
          },
          plugins: {
            legend: {
              position: 'top',
              display: false,
            },
            title : {
              position : 'top',
              text : 'Porcentaje de consumo: ' + porcentaje.toFixed(2) +' %',
              display : true
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

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DashboardService } from './../../_services/dashboard.service';
import { Chart, ChartConfiguration, ChartData,  registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-instalaciones-tipo-vehiculo-chart',
  templateUrl: './instalaciones-tipo-vehiculo-chart.component.html',
  styleUrls: ['./instalaciones-tipo-vehiculo-chart.component.scss']
})
export class InstalacionesTipoVehiculoChartComponent implements OnInit {
  chartConfig : ChartConfiguration;
  chartData  : ChartData;

  private dataAutos: [];
  private dataVans: [];
  private dim : [];
    

  constructor(private dash : DashboardService) {
    Chart.register(...registerables);
   }
   
  ngOnInit(): void {
    this.dash.obtenDashboard(4)
    .pipe(first()).subscribe((dataList : any) => {
       console.log(JSON.stringify(dataList));
      this.dataAutos = dataList['datos'][0].map((res : any) => res.Autos);
      this.dataVans = dataList['datos'][0].map((res : any) => res.Vans);
      this.dim = dataList['datos'][0].map((res : any) => res.Periodo);

      var ctx  = 'barsChart';

      this.chartData = {
        labels: this.dim,
        datasets: [
          {
            type: 'bar',
            label: 'Autos',
            data: this.dataAutos,
            borderColor: 'rgb(28, 15, 250 )',
            backgroundColor: 'rgba(28, 15, 250, 0.6 )',
            yAxisID : 'y'
          },
          {
            type: 'bar',
            label: 'Vans',
            data: this.dataVans,
            borderColor: 'rgb(86, 224, 52 )',
            backgroundColor: 'rgba(86, 224, 52, 0.6 )',
            yAxisID : 'y'
          },
          
        ]
      }
   
     
      this.chartConfig  = {
        type: 'bar',
        data: this.chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              type : 'linear',
              position : 'left'
            },

          }
        }
      };

      const mixesChart = new Chart(ctx,  this.chartConfig);

    })
  }

}

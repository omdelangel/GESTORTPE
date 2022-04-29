import { first } from 'rxjs/operators';
import { DashboardService } from './../../_services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData,  registerables } from 'node_modules/chart.js';


@Component({
  selector: 'app-tendencia-chart',
  templateUrl: './tendencia-chart.component.html',
  styleUrls: ['./tendencia-chart.component.scss']
})

export class TendenciaChartComponent implements OnInit {
  chartConfig : ChartConfiguration;
  chartData   : ChartData;  

  private dataLitros : [];
  private dataImporte : [];
  private dataAhorros : [];
  private dataBeneficios : [];
  private dataVehiculos : [];
  private dims : [];

  constructor(private dash : DashboardService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.dash.obtenDashboard(3).pipe(first()).subscribe({next: (dataList : any) => {

      this.dataImporte = dataList['datos'][0].map((res : any) => res.ImporteConsumo);
      this.dataAhorros = dataList['datos'][0].map((res : any) => res.TotalAhorro);
      this.dataBeneficios = dataList['datos'][0].map((res : any) => res.TotalBeneficios);
      this.dataVehiculos = dataList['datos'][0].map((res : any) => res.VehiculosConsumo);
      this.dataLitros = dataList['datos'][0].map((res : any) => res.LitrosConsumo);
      this.dims = dataList['datos'][0].map((res : any) => res.Periodo);

      var ctx  = 'tendenciaChart';

      this.chartData = {
        labels: this.dims,
        datasets: [
          {
            type: 'line',
            label: 'Litros consumo',
            data: this.dataLitros,
            borderColor: 'rgb(24 70 209)',
            yAxisID : 'secundario'
          },
          {
            type: 'bar',
            label: 'Importe consumo',
            data: this.dataImporte,
            borderColor: 'rgb(233, 240, 42 )',
            backgroundColor: 'rgba(233, 240, 42, 0.6 )',
            yAxisID : 'y'
          },
          {
            type: 'bar',
            label: 'Total Ahorro',
            data: this.dataAhorros,
            borderColor: 'rgb(241, 196, 15 )',
            backgroundColor: 'rgba(241, 196, 15, 0.6 )',
            yAxisID : 'y'
          },
          {
            type: 'bar',
            label: 'Total Beneficios',
            data: this.dataBeneficios,
            borderColor: 'rgb(14, 151, 229 )',
            backgroundColor: 'rgba(14, 151, 229, 0.6 )',
            yAxisID : 'y'
          }
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
            secundario: {
              beginAtZero: true,
              type : 'linear',
              position : 'right'
            }
          }
        }
      };

      const mixesChart = new Chart(ctx,  this.chartConfig);
    }})
  }
    
  
}
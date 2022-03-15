import { first } from 'rxjs/operators';
import { DashboardService } from '../../_services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  private dataPie = [];
  private dimsPie = [];

  constructor(private dash : DashboardService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.dash.obtenDashboard(1)
    .pipe(first()).subscribe((dataList : any) => {
      // console.log(JSON.stringify(dataList));
      this.dataPie = dataList['datos'][0].map((res : any) => res.Citas);
      this.dimsPie = dataList['datos'][0].map((res : any) => res.TipoVehiculo);

      console.log(this.dimsPie);

      const ctx  = 'pieChart';

      
    
    const pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: this.dimsPie,
        datasets: [
          {
            label: "Distribusión de vehículos aprobados por tipo de vehículo",
            data: this.dataPie,
            backgroundColor: ["rgb(28, 15, 250)", "rgb(86, 224, 52)"],
            hoverOffset: 4,
        
          },
          
        ],
        
      },
      
    });

    })
  }


}

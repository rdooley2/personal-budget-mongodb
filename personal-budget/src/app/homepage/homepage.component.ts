import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
        {
            data: [] as number[],
            backgroundColor: [
                'red',
                'orange',
                'yellow',
                'green',
                'blue',
                'purple',
                'black',
            ]
        }
    ],
    labels: [] as string[]
};

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {

    Chart.register(PieController, ArcElement, Tooltip, Legend);

      this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;

      }
      this.createChart();
      });
  }

  createChart() {
    const chartElement = document.getElementById('myChart') as HTMLCanvasElement | null;

    if (chartElement) {
      const ctx = chartElement.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      } else {
        console.error('Unable to get 2D context for chart');
      }
    } else {
      console.error('Chart element with ID "myChart" not found');
    }
  }

}

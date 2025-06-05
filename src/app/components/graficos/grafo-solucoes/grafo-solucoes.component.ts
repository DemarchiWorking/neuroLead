import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common'; // Adicione isso
//import { ChartConfiguration } from 'chart.js';
//import { BaseChartDirective } from 'ng2-charts';
//import { Chart, ChartConfiguration, RadialLinearScale } from 'chart.js';
//import { registerables } from 'chart.js';
//import { ChartsModule } from 'ng2-charts';
// ...
//imports: [CommonModule, ]
// Registrar os componentes necessários do Chart.js
//Chart.register(...registerables, RadialLinearScale);
@Component({
  selector: 'app-grafo-solucoes',
  standalone: true,
  imports: [CommonModule],//, //NgChartsModule], // BaseChartDirective,Adicione CommonModule
  templateUrl: './grafo-solucoes.component.html',
  styleUrl: './grafo-solucoes.component.scss'
})
export class GrafoSolucoesComponent {
  /*
   public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Configuração do tipo radar
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top', 
        labels: { color: '#222' } 
      },
      title: { display: false }
    },
    scales: {
      r: {
        pointLabels: {
          color: '#374151',
          font: { size: 14 }
        },
        grid: { color: '#CFCFCF' },
        angleLines: { color: '#CFCFCF' },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  public radarChartLabels: string[] = [
    'Dados & IA',
    'Cybersegurança',
    'Cloud & Infraestrutura',
    'Automação & RPA',
    'Soluções Mobile & Web',
    'Consultoria & Gestão de Projetos'
  ];

  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: this.radarChartLabels,
    datasets: [
      {
        label: 'Índice de Aderência',
        data: [75, 45, 60, 90, 70, 55],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };*/
}
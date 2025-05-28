import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, RadialLinearScale } from 'chart.js';
import 'chart.js/auto'; // Importação importante para registrar todos os componentes

@Component({
  selector: 'app-grafo-solucoes',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './grafo-solucoes.component.html',
  styleUrl: './grafo-solucoes.component.scss'
})
export class GrafoSolucoesComponent {
  // Configuração do tipo radar
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top', 
        labels: { color: "#222" } 
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
        max: 100
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
  };
}
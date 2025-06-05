import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TargetEmpresaService } from '../../services/target/target-empresa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-empresa',
  imports: [NgFor, CommonModule],
  standalone: true,
  templateUrl: './card-empresa.component.html',
  styleUrl: './card-empresa.component.scss'
})
export class CardEmpresaComponent {/*
  @Input() companyName: string = '';
  @Input() logoUrl: string = '';
  @Input() rating: number = 0;
  @Input() ratingLabel: string = '';
  @Input() responseTime: string = '';
  @Input() positiveReviews: number = 0;
  @Input() averageRating: number = 0;
  @Input() totalClaims: number = 0;
  @Input() indices: { name: string, value: number }[] = [];
  @Input() verified: boolean = false;

  @Input() companyLogo: string = '';
  @Input() levelLabel: string = 'Bom';
  @Input() averageScore: number = 6.24;
  @Input() evaluations: number = 6;*/
  
  empresaAtual: any;
  sub: Subscription | undefined;
  constructor(private empresaSelecionadaService: TargetEmpresaService) {}
  ngOnInit() {
      this.sub = this.empresaSelecionadaService.empresaSelecionada$.subscribe(emp => {
      this.empresaAtual = emp;
        // AQUI você atualiza a view com os detalhes dessa empresa
      });
    }
    // Mock dos dados conforme o Itaú do exemplo
  companyName: string = 'Banco Itaú';
  companyLogo: string = 'assets/itau-logo.svg'; // (troque para o caminho real/local do logo)
  rating: number = 7.3;
  levelLabel: string = 'Bom';
  responseTime: string = '8 dias';
  evaluations: number = 6;
  averageScore: number = 6.24;
  indices = [
    { name: 'Taxa de sucesso em negociações', value: 89.5 },
    { name: 'Feedback do Cliente', value: 66 },
    { name: 'Índice de solução', value: 75.8 }
  ];

   getRatingEmoji(): string {
    return this.rating >= 7 ? '😊' : '😕';
  }
}
 

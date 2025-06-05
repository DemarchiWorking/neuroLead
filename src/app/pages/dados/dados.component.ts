
import { Component, NgModule, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeadService } from '../../services/lead.service';
import { CommonModule } from '@angular/common'; //NgFor, NgIf
import { FormsModule, NgModel } from '@angular/forms';
//import { BaseChartDirective } from 'ng2-charts';
//import { ChartData, ChartOptions } from 'chart.js'; // ADICIONE
import { v4 as uuidv4 } from 'uuid';
import { CarouselDetalhesComponent } from '../../components/carousel-detalhes/carousel-detalhes.component';
import { TargetEmpresaService } from '../../services/target/target-empresa.service';
@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-dados',
  imports: [HttpClientModule, FormsModule, CommonModule, 
    //BaseChartDirective,
    CarouselDetalhesComponent], // INCLUA NgChartsModule aqui
  standalone: true,
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.scss'
})
export class DadosComponent {



// Troque a URL abaixo se seu Node estiver em outro endereço/porta ou hostname
 private apiUrl = 'http://localhost:3001/api/leads';
 modalAberto = false;
  leadSelecionado: any = {};
  constructor(
    private http: HttpClient,
    private leadService: LeadService,
    private targetEmpresaService: TargetEmpresaService 
  ) {}
  leads: any[] = [];
  carregando = true;
  novoLead : any = {
    empresa_plataforma_setor_tipo_data: uuidv4(), 
    token: '',
    leadId: '',
    Nome: '',
    Setor: '',
    Porte: ''
};
  sucesso = '';
  erro = '';

  ngOnInit() {
    this.buscarLeads();
  }
/*
public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Comparativo Empresas'
      }
    }
  };*/
  selecionarEmpresa(empresa: any) {
  this.targetEmpresaService.selecionarEmpresa(empresa);
  }

  getLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarLeads() : any {
    this.leadService.getLeads().subscribe({
      next: (dados) => {
        this.carregando = false;
        this.leads = dados;
        this.montarGrafico(); 

      },
      error: (err) => {
        this.carregando = false;
        this.erro = 'Erro ao carregar dados!';
        console.error(err);
      }
    });
    return this.leads;
  }

  salvar() {
    if (!this.novoLead.leadId) {
      this.erro = 'O leadId é obrigatório!';
      return;
    }
    this.sucesso = '';
    this.erro = '';
    this.leadService.salvarLead(this.novoLead).subscribe({
      next: () => {
        this.sucesso = 'Lead salvo com sucesso!';
        this.novoLead = { empresa_plataforma_setor_tipo_data: this.novoLead.empresa_plataforma_setor_tipo_data = uuidv4(), leadId: 'test', Nome: 'test', Setor: 'test', Porte: 'test' };
      },
      error: () => {
        this.erro = 'Erro ao salvar lead!';
      },
    });
  }
  montarGrafico() {
    /*
    this.barChartData = {
      labels: this.leads.map(lead => lead.nome || lead.Nome || lead.leadId || '—'),
      datasets: [
        {
          data: this.leads.map(lead => Number(lead.score ?? 0)),
          label: 'Score'
        },
        {
          data: this.leads.map(lead => Number(lead.avaliacao ?? 0)),
          label: 'Avaliação'
        },
        {
          data: this.leads.map(lead => Number(lead.funcionarios ?? 0)),
          label: 'Funcionários'
        },
        {
          data: this.leads.map(lead => Number(lead.faturamento ?? lead.faturamento_anual ?? 0)),
          label: 'Faturamento (R$)'
        }
      ]
    };*/
  }
   abrirModalEditar(lead: any) {
    this.leadSelecionado = { ...lead }; // Cópia para edição sem mexer no original
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.leadSelecionado = {};
  }

  salvarEdicao() {
    // Salve as alterações, por ex, via serviço:
    this.leadService.atualizarLead(this.leadSelecionado).subscribe({
      next: () => {
        this.sucesso = 'Lead atualizado!';
        this.buscarLeads();
        this.fecharModal();
      },
      error: () => {
        this.erro = 'Erro ao atualizar lead!';
      }
    });
  }

  excluirLead(lead: any) {
    if (confirm('Tem certeza que deseja apagar este lead?')) {
      this.leadService.excluirLead(lead.leadId) //|| lead.id, lead.token ||) // use o campo-único que identifica o lead
        .subscribe({
          next: () => {
            this.sucesso = 'Lead removido!';
            this.buscarLeads();
          },
          error: () => {
            this.erro = 'Erro ao remover lead!';
          }
        });
    }
  }
}
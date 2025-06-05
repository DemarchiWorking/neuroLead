import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { GrafoSolucoesComponent } from '../graficos/grafo-solucoes/grafo-solucoes.component';
import { Subscription } from 'rxjs';
import { TargetEmpresaService } from '../../services/target/target-empresa.service';
import { CardEmpresaComponent } from '../card-empresa/card-empresa.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-carousel-detalhes',
  imports: [NgStyle, NgFor, NgIf, GrafoSolucoesComponent, TabsComponent , CardEmpresaComponent, HttpClientModule],
  templateUrl: './carousel-detalhes.component.html',
  styleUrl: './carousel-detalhes.component.scss',
  styles: [`
    section { font-family: 'Inter', 'Segoe UI', sans-serif; }
    .fadein { animation: fadein-panel 0.28s cubic-bezier(.5,.1,.3,1); }
    @keyframes fadein-panel {
      from { opacity: 0; transform: translateY(-12px);}
      to { opacity: 1; transform: none;}
    }
    .group.expanded { border-bottom-left-radius: 0 !important; border-bottom-right-radius: 0 !important; }
    .accordion-content {
      border-top: none !important;
      animation: fadein-panel .28s cubic-bezier(.5,.1,.3,1);
    }
    @media (max-width: 600px) {
      .accordion-content, .group { padding-left: 8px !important; padding-right: 8px !important; }
    }
  `]
})
export class CarouselDetalhesComponent {
  currentIndex = 0;
  empresaDominio = '';
  empresaAtual: any;
  sub: Subscription | undefined;

  logoUrl?: string;
  erro = false;
  images = [
    'https://logo.clearbit.com/itau',
    'https://logo.clearbit.com/stefanini',
    'https://logo.clearbit.com/globo',
  ];
    dominio: string = '';
    accordionExpanded = false;
    descricao : String = 'Para saber informações sobre a empresa, clique no botão.';



  imagessss="https://upload.wikimedia.org/wikipedia/pt/7/78/Logo_Banco_BV.png";
  imagess="";

  constructor(
    private empresaSelecionadaService: TargetEmpresaService, 
    private http: HttpClient) {}

  ngOnInit() {
      this.sub = this.empresaSelecionadaService.empresaSelecionada$.subscribe(emp => {
        this.empresaAtual = emp;
        // AQUI você atualiza a view com os detalhes dessa empresa
      });
    }
  

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }





  fecharAccordion(ev: Event) {
    ev.stopPropagation();
    this.accordionExpanded = false;
  }
  atualizarLogo() {
    this.erro = false;
    // sanitize: remove espaços, forçar lower, etc
    const dominio = this.empresaDominio.trim().toLowerCase();
    // Pode fazer validação mais elaborada se quiser
    if (!dominio || !dominio.includes('.')) {
      this.logoUrl = undefined;
      return;
    }
    // Brandfetch versão CDN aberta (consulte seu plano): substitua por assets.brandfetch.io em produção premium
    this.logoUrl = `https://logo.clearbit.com/${dominio}`;
    alert(this.logoUrl);
  }

  onLogoErro() {
    this.erro = true;
    this.logoUrl = undefined;
  }

    updateLogo() {
    this.erro = false;
    const dom = (this.dominio || '').trim().toLowerCase();
    if (dom && dom.includes('.')) {
      this.logoUrl = `https://assets.brandfetch.io/${dom}`;
    } else {
      this.logoUrl = undefined;
    }
  }

  onError() {
    this.erro = true;
    this.logoUrl = undefined;
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  
async avancar() {
  // Chama IA (await para garantir o recebimento do JSON)
  await this.pedirCamposIA();

}


async pedirCamposIA() {
  try {

    const resposta = await firstValueFrom(
      this.http.post<{ resposta: string }>(
        'http://localhost:3001/api/chatt', 
        { pergunta: "Como Engenheiro Pré-vendas/Comercial me traga todas informações relevantes sobre o Itau?" }
      )
    );
    console.log('Chamando IA...');
    // Espera o JSON formatado pelo GPT
    const dataBruta : string | undefined = resposta?.resposta?.trim();    
    // O .resposta pode estar com código markdown ou outros enfeites, tire só o JSON:
    const jsonMatch = dataBruta?.match(/\{[\s\S]*\}/);
    let dadosIA: any = {};
    
    console.log('Resposta recebida do backend:', resposta);
    this.descricao = resposta?.resposta || 'Descrição não disponível';
    if (jsonMatch) {
      try {
        dadosIA = JSON.parse(jsonMatch[0]);
        console.log('Dados recebidos da IA:', dadosIA);
        console.log('Dados recebidos da IA:', dadosIA.Descricao);
        this.descricao = await dadosIA.Descricao || 'Descrição não disponível';
      } catch (err) {
        this.erro = true;
        return;
      }
    }
  } catch (err) {
  }
}
}
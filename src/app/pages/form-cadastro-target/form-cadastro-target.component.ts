import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-form-cadastro-target',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, HttpClientModule],
  templateUrl: './form-cadastro-target.component.html',
  styleUrl: './form-cadastro-target.component.scss',
  animations: [
    trigger('formStep', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate(
          '350ms cubic-bezier(0.23, 1, 0.32, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ]),
      transition(':leave', [
        animate(
          '220ms',
          style({ opacity: 0, transform: 'translateX(-24px)' })
        )
      ])
    ])
  ] // Está correto!
  // NÃO precisa de schemas: [CUSTOM_ELEMENTS_SCHEMA]!
})
export class FormCadastroTargetComponent {
  filtros = [
    { nome: 'Privada', ativo: true },
    { nome: 'Governamental', ativo: false },
  ];

  nomeApontado: string = '';
  nomeSalvo: string = '';
  nomeSalvoStep1: string = '';
  carregando = false;
  erro = false;
  stepAtual = 0;
  totalSteps = 3;

  usarNeuronioArtificial = false;

  // Campos do formulário extendido
  foto = '';
  nome = '';
  funcionarios = '';
  setor = '';
  porte = '';
  lucro = '';
  avaliacao = '';
  score = '';
  multinacional = '';
  faturamento = '';
  idade = '';
  quantidadeFiliais = '';
  matriz = '';

  camposNormalizados: any = {};

  // Feedback na tela
  envioSucesso = false;
  envioErro = '';
  enviando = false;

  constructor(private http: HttpClient) {}



async pedirCamposIA() {
  try {
    // Mostra carregando, desativa erro
    this.carregando = true;
    this.erro = false;

    const resposta = await this.http.post<{ resposta: string }>(
      'http://localhost:3001/api/chat', 
      { pergunta: this.nomeApontado }
    ).toPromise();

    // Espera o JSON formatado pelo GPT
    const dataBruta : string | undefined = resposta?.resposta?.trim();    
    // O .resposta pode estar com código markdown ou outros enfeites, tire só o JSON:
    const jsonMatch = dataBruta?.match(/\{[\s\S]*\}/);
    let dadosIA: any = {};
    if (jsonMatch) {
      try {
        dadosIA = JSON.parse(jsonMatch[0]);
      } catch (err) {
        this.erro = true;
        return;
      }
    }

    // Preencher campos do Step2 a partir do JSON, tratando campos ausentes ou nulos
    this.foto            = dadosIA.Foto ?? '';
    this.nome            = dadosIA.Nome ?? this.nomeApontado ?? '';
    this.funcionarios    = dadosIA.Funcionarios != null ? dadosIA.Funcionarios.toString() : '';
    this.setor           = dadosIA.Setor ?? '';
    this.porte           = dadosIA.Porte ?? '';
    this.lucro           = dadosIA.Lucro != null ? dadosIA.Lucro.toString() : '';
    this.avaliacao       = dadosIA.Avaliacao != null ? dadosIA.Avaliacao.toString() : '';
    this.score           = dadosIA.Score != null ? dadosIA.Score.toString() : '';
    this.multinacional   = (typeof dadosIA.Multinacional === 'string') ? dadosIA.Multinacional : '';
    this.faturamento     = dadosIA['Faturamento anual'] != null ? dadosIA['Faturamento anual'].toString() : '';
    this.idade           = dadosIA.Idade != null ? dadosIA.Idade.toString() : '';
    this.quantidadeFiliais = dadosIA['Quantidade de filiais'] != null ? dadosIA['Quantidade de filiais'].toString() : '';
    this.matriz          = dadosIA.Matriz ?? '';

    this.carregando = false;
  } catch (err) {
    this.erro = true;
    this.carregando = false;
  }
}
/*
async pedirCamposIA(){console.log("t")}*/

async avancar() {
  if (this.stepAtual === 0) {
    this.nomeSalvoStep1 = this.nomeApontado;

    if (this.usarNeuronioArtificial) {
      // Chama IA (await para garantir o recebimento do JSON)
      await this.pedirCamposIA();

      // Avança direto para o Step 2 (informação já preenchida) e prepara normalizados para Step 3
      this.camposNormalizados = this.normalizarStep2();
      this.stepAtual = 2;
      return;
    }
    // NÃO usa Neurônio Artificial
    this.stepAtual++;
  }
  else if (this.stepAtual === 1) {
    this.camposNormalizados = this.normalizarStep2();
    this.stepAtual++;
  }
  else if (this.stepAtual < this.totalSteps - 1) {
    this.stepAtual++;
  }
}

  voltar() {
    if (this.stepAtual > 0) this.stepAtual--;
  }

  aoFinalizar() {
    const leadObj = {
      token: '999', 
      leadId:  uuidv4(), 
      foto: this.camposNormalizados.foto,
      nome: this.camposNormalizados.nome,
      funcionarios: this.camposNormalizados.funcionarios,
      setor: this.camposNormalizados.setor,
      porte: this.camposNormalizados.porte,
      lucro: this.camposNormalizados.lucro,
      avaliacao: this.camposNormalizados.avaliacao,
      score: this.camposNormalizados.score,
      multinacional: this.camposNormalizados.multinacional,
      faturamento: this.camposNormalizados.faturamento,
      idade: this.camposNormalizados.idade,
      quantidadeFiliais: this.camposNormalizados.quantidadeFiliais,
      matriz: this.camposNormalizados.matriz,
      empresa_plataforma_setor_tipo_data: `${this.camposNormalizados.nome || 'semnome'}_${this.camposNormalizados.setor || 'setor'}_${Date.now()}`
    };

    this.enviando = true;
    this.envioSucesso = false;
    this.envioErro = '';

    this.http.post<{ message: string, lead: any }>('http://localhost:3001/api/leads', leadObj)
      .subscribe({
        next: (resp) => {
          this.envioSucesso = true;
          this.enviando = false;
        },
        error: (err) => {
          this.envioErro = err?.error?.error || 'Erro ao enviar lead!';
          this.enviando = false;
        }
      });
  }

  aoSalvar() {
    if (!this.nomeApontado) return;
    this.carregando = true;
    this.erro = false;
    this.nomeSalvo = '';

    this.http.post<{ resposta: string }>('http://localhost:3001/api/chat', {
      pergunta: this.nomeApontado
    }).subscribe({
      next: (resp) => {
        this.nomeSalvo = resp.resposta;
        this.carregando = false;
      },
      error: () => {
        this.nomeSalvo = '';
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  preencherAleatorioStep2(positivo = false) {
    this.foto = '';
    this.nome = this.nomeSalvoStep1 || this.nomeApontado;
    this.funcionarios = positivo ? this.randPos() : this.randNeg();
    this.setor = positivo ? this.randPos() : this.randNeg();
    this.porte = positivo ? this.randPos() : this.randNeg();
    this.lucro = positivo ? this.randPos() : this.randNeg();
    this.avaliacao = positivo ? this.randPos() : this.randNeg();
    this.score = positivo ? this.randPos() : this.randNeg();
    this.multinacional = positivo ? (Math.random() > 0.5 ? 'Sim' : 'Não') : (Math.random() > 0.5 ? 'Sim' : 'Não');
    this.faturamento = positivo ? this.randPos() : this.randNeg();
    this.idade = positivo ? this.randPos() : this.randNeg();
    this.quantidadeFiliais = positivo ? this.randPos() : this.randNeg();
    this.matriz = positivo ? this.randPos() : this.randNeg();
  }

  randPos() {
    return Math.floor(Math.random() * 100 + 1).toString();
  }
  randNeg() {
    return (-1 * Math.floor(Math.random() * 100 + 1)).toString();
  }

  normalizarStep2() {
    return {
      foto: this.foto,
      nome: this.nome.trim(),
      funcionarios: this.funcionarios.trim(),
      setor: this.setor.trim(),
      porte: this.porte.trim(),
      lucro: this.lucro.trim(),
      avaliacao: this.avaliacao.trim(),
      score: this.score.trim(),
      multinacional: this.multinacional,
      faturamento: this.faturamento.trim(),
      idade: this.idade.trim(),
      quantidadeFiliais: this.quantidadeFiliais.trim(),
      matriz: this.matriz.trim()
    };
  }
}
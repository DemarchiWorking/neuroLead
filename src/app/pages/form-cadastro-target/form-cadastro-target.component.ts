import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-form-cadastro-target',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule , HttpClientModule],
  templateUrl: './form-cadastro-target.component.html',
  styleUrl: './form-cadastro-target.component.scss',
    animations: [
    trigger('formStep', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('350ms cubic-bezier(0.23, 1, 0.32, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('220ms', style({ opacity: 0, transform: 'translateX(-24px)' }))
      ])
    ])
  ]
})
export class FormCadastroTargetComponent {
  filtros = [
    { nome: 'Privada', ativo: true },
    { nome: 'Governamental', ativo: false },
  ];

  nomeApontado: string = '';
  nomeSalvo: string = '';
  carregando = false;
  erro = false;
  stepAtual = 0;
  totalSteps = 3;

  funcionarios = '';
  faturamento = '';



  constructor(private http: HttpClient) {}
  avancar() {
    if (this.stepAtual < this.totalSteps - 1) this.stepAtual++;
  }
  voltar() {
    if (this.stepAtual > 0) this.stepAtual--;
  }

  

  aoFinalizar() {
    // finalize, salve ou envie seus dados aqui!
    alert('Formulário completo!');
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
  
}
/*
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro-target',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './form-cadastro-target.component.html',
  styleUrl: './form-cadastro-target.component.scss'
})
export class FormCadastroTargetComponent {
  filtros = [
    { nome: 'Todos os Resultados', ativo: true },
    { nome: 'Privada', ativo: false },
    { nome: 'Governamental', ativo: false },
    { nome: 'Vagas', ativo: false },
    { nome: 'Trilhas', ativo: false }
  ];

  nomeApontado: string = '';
  nomeSalvo: string = '';
  carregando = false;
  erro = false;

  constructor(private http: HttpClient) { }

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
      error: (err) => {
        console.error(err);
        this.nomeSalvo = '';
        this.erro = true;
        this.carregando = false;
      }
    });
  }
}
  */
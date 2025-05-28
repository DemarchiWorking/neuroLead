
import { Component, NgModule, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeadService } from '../../services/lead.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-dados',
  imports: [HttpClientModule, NgIf, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.scss'
})
export class DadosComponent {
// Troque a URL abaixo se seu Node estiver em outro endereço/porta ou hostname
  private apiUrl = 'http://localhost:3001/api/leads';

  constructor(private http: HttpClient,private leadService: LeadService) {}
  leads: any[] = [];
  carregando = true;
  novoLead : any = {
    empresa_plataforma_setor_tipo_data: uuidv4(), // Adicione este campo com o valor vindo do usuário
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


  getLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarLeads() : any {
    this.leadService.getLeads().subscribe({
      next: (dados) => {
        this.carregando = false;
        this.leads = dados;
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
}


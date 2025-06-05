import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TargetEmpresaService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3001/api/detalhes'; // URL do seu backend Node.js

  private empresaSelecionadaSubject = new BehaviorSubject<any>(null);

  empresaSelecionada$ = this.empresaSelecionadaSubject.asObservable();

  selecionarEmpresa(empresa: any) {
    console.log('Empresa selecionada:', empresa);    console.log('Empresa selecionada:', empresa.nome);    console.log('Empresa selecionada:', empresa.leadId);
    this.registrarDetalhesEmpresa(empresa).subscribe();

    this.empresaSelecionadaSubject.next(empresa); // dispara para quem estiver inscrito
  }


  registrarDetalhesEmpresa(lead: any): Observable<any> {

    console.log('Registrando detalhes da empresa:', lead);
   // if (!this.novoLead.leadId) {this.erro = 'O leadId é obrigatório!';  return;}
  
    return this.http.post<any>(this.apiUrl, lead);
    /*
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
    */
  }
}

/*


  // Troque a URL abaixo se seu Node estiver em outro endereço/porta ou hostname


  salvarLead(lead: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, lead);
  }
  getLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  atualizarLead(lead: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${lead.token || lead.leadId || lead.id}`, lead);
  }
  excluirLead(id: string): Observable<any> {
    alert(`Excluindo lead com ID: ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}



*/
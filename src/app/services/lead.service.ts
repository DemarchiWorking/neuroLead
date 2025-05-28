import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http: HttpClient) {}

  // Troque a URL abaixo se seu Node estiver em outro endereço/porta ou hostname
  private apiUrl = 'http://localhost:3001/api/leads';


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


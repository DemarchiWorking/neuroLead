import { NgIf, NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-cadastro-target',
  imports: [NgIf, NgFor,NgClass],
  standalone: true,
  templateUrl: './form-cadastro-target.component.html',
  styleUrl: './form-cadastro-target.component.scss'
})
export class FormCadastroTargetComponent {
  filtros = [
    { nome: 'Todos os Resultados', ativo: true },
    { nome: 'Membros', ativo: false },
    { nome: 'Grupos', ativo: false },
    { nome: 'Vagas', ativo: false },
    { nome: 'Trilhas', ativo: false }
  ];
}

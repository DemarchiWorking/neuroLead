import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { PainelNotificacaoComponent } from '../painel-notificacao/painel-notificacao.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, NgClass, PainelNotificacaoComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuOpen = false;
  notificationPanelOpen = false;
  notificationCount = 3;

  notifications = [
    {
      avatar: '/robo-cop.png',
      nome: 'NeuroLead',
      texto: `postou uma atualização em Avisos e novidades para todos! <br>
        <span class="font-semibold"> Alerta: Edital de Cultura 2025, com oportunidade para projetos interessantes. </span> Ex: Itaú Viver Mais <span>`,
      data: 'agora mesmo',
      visto: false
    },
    {
      avatar: '/robo-cop.png',
      nome: 'NeuroLead',
      texto: `curtiu o novo desafio Agro com Inteligência Artificial e Machine Learning.`,
      data: 'há 5 min',
      visto: false
    },
    {
      avatar: '/robo-cop.png',
      nome: 'NeuroLead',
      texto: `Oportunidade: Possível potencial cliente com problemas de Infraestrutura. Ex: Correios`,
      data: 'há 2h',
      visto: true
    }
  ];

  openMenu() {
    this.menuOpen = true;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  toggleNotificationPanel() {
    this.notificationPanelOpen = !this.notificationPanelOpen;
  }
  closeNotificationPanel() {
    this.notificationPanelOpen = false;
  }
}
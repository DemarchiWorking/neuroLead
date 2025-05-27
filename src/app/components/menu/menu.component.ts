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
      avatar: '/assets/avatar.jpg',
      nome: 'Antonio',
      texto: `postou uma atualização em Avisos e novidades para todos! <br>
        <span class="font-semibold"> Alerta: Edital de Cultura 2025, com oportunidade para projetos interessantes.</span>`,
      data: 'agora mesmo',
      visto: false
    },
    {
      avatar: '/assets/avatar.jpg',
      nome: 'Antonio',
      texto: `curtiu o novo conteúdo em Inteligência Artificial e Machine Learning (S522...252).`,
      data: 'há 5 min',
      visto: false
    },
    {
      avatar: '/assets/avatar.jpg',
      nome: 'Antonio',
      texto: `Oportunidade: Possível potencial cliente com problemas de Infraestrutura.`,
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
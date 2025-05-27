import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
      nome: 'Andre Estevão',
      texto: 'publicou uma atualização: As bases no vocabulário para TODAS as produções científicas (PDF).',
      data: 'agora mesmo',
      visto: false
    },
    {
      avatar: '/assets/avatar.jpg',
      nome: 'Tiago Cardone',
      texto: 'curtiu seu novo post em Aprendizado de Máquina.',
      data: 'há 5 min',
      visto: false
    },
    {
      avatar: '/assets/avatar.jpg',
      nome: 'Jornalismo e Mídia Sociais',
      texto: 'atualizou um documento em Machine Learning (EEE).',
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
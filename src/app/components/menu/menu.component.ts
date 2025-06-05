import { Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { PainelNotificacaoComponent } from '../painel-notificacao/painel-notificacao.component';
import { NgIf, NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, NgClass, PainelNotificacaoComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnDestroy {
  menuOpen = false;
  notificationPanelOpen = false;
  profilePanelOpen = false;
  notificationCount = 3;

  user = {
    avatar: '/robo-cop.png',
    nome: 'Antonio Demarchi',
    username: 'stefaninier.comercial',
    perfil: 'Administrador',
    empresa: 'NeuroInsight'
  };

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
  private documentClickListener: any;
  private isBrowser: boolean;

  constructor(
    private eRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.documentClickListener = (event: MouseEvent) => {
        if (this.profilePanelOpen && !this.eRef.nativeElement.contains(event.target)) {
          this.profilePanelOpen = false;
        }
      };
      document.addEventListener('click', this.documentClickListener, true);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener, true);
    }
  }

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
  toggleProfilePanel(): void {
    this.profilePanelOpen = !this.profilePanelOpen;
  }
}
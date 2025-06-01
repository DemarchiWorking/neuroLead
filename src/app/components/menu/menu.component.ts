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
    // ... seu array de notificações ...
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
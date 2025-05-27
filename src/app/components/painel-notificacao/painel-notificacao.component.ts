import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export interface Notification {
  avatar: string;
  nome: string;
  texto: string;
  data: string;
  visto?: boolean;
}

@Component({
  selector: 'app-painel-notificacao',
  standalone: true,
  templateUrl: './painel-notificacao.component.html',
  styleUrl: './painel-notificacao.component.scss',
  imports: [NgIf, NgFor]
})
export class PainelNotificacaoComponent {
  @Input() notifications: Notification[] = [];
  @Output() close = new EventEmitter<void>();

  // Fecha ao pressionar esc
  @HostListener('document:keydown.escape', ['$event'])
  onEscClose(event: KeyboardEvent) {
    this.close.emit();
  }

  // Fecha ao clicar fora do painel
  @HostListener('document:click', ['$event'])
  onGlobalClick(event: MouseEvent) {
    const path = event.composedPath();
    const hasPopover = path.some((el: any) => el?.classList && el.classList.contains('painel-notificacao-popover'));
    if (!hasPopover) {
      this.close.emit();
    }
  }

  handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
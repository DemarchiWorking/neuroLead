import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

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
  imports: [NgIf, NgFor],
  templateUrl: './painel-notificacao.component.html',
  styleUrl: './painel-notificacao.component.scss'
})
export class PainelNotificacaoComponent {
  @Input() notifications: Notification[] = [];
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscClose(event: KeyboardEvent) {
    this.close.emit();
  }
}
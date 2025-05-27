import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelNotificacaoComponent } from './painel-notificacao.component';

describe('PainelNotificacaoComponent', () => {
  let component: PainelNotificacaoComponent;
  let fixture: ComponentFixture<PainelNotificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelNotificacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

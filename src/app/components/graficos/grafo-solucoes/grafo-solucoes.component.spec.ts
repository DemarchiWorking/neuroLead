import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoSolucoesComponent } from './grafo-solucoes.component';

describe('GrafoSolucoesComponent', () => {
  let component: GrafoSolucoesComponent;
  let fixture: ComponentFixture<GrafoSolucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrafoSolucoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrafoSolucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAlvoComponent } from './cadastrar-alvo.component';

describe('CadastrarAlvoComponent', () => {
  let component: CadastrarAlvoComponent;
  let fixture: ComponentFixture<CadastrarAlvoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarAlvoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarAlvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

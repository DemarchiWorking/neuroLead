import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosComponent } from './dados.component';

describe('DadosComponent', () => {
  let component: DadosComponent;
  let fixture: ComponentFixture<DadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

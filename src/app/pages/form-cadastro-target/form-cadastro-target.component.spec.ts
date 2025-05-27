import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroTargetComponent } from './form-cadastro-target.component';

describe('FormCadastroTargetComponent', () => {
  let component: FormCadastroTargetComponent;
  let fixture: ComponentFixture<FormCadastroTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroTargetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

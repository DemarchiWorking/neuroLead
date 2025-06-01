import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDetalhesComponent } from './carousel-detalhes.component';

describe('CarouselDetalhesComponent', () => {
  let component: CarouselDetalhesComponent;
  let fixture: ComponentFixture<CarouselDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

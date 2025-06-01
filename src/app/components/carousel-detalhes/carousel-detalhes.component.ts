import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-detalhes',
  imports: [NgStyle, NgFor],
  templateUrl: './carousel-detalhes.component.html',
  styleUrl: './carousel-detalhes.component.scss'
})
export class CarouselDetalhesComponent {
  currentIndex = 0;

  images = [
    '/semeart.jpg',
    '/semeart.jpg',
    '/semeart.jpg',
    '/semeart.jpg',
  ];
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

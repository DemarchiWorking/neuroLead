import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface Character {
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-tabs',
  imports: [NgClass,NgFor],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
 mainTabs = [
    {
      label: 'Informações',
      characters: [
        {
          name: 'Descrição',
          description: '...',
          image: ''
        },
        {
          name: 'Dados',
          description: '',
          image: ''
        },
        {
          name: 'Graficos',
          description: '',
          image: ''
        },
        {
          name: 'Histórico',
          description: '',
          image: ''
        },
        {
          name: 'Anotações',
          description: '',
          image: ''
        }
      ]
    },
    {
      label: 'Contatos',
      characters: [
        {
          name: 'Rodrigo Silva',
          description: 'Linkedin: https://www.linkedin.com/in/rodrigo-silva-123456789/',
          image: 'https://upload.wikimedia.org/wikipedia/en/2/28/Philip_Fry.png'
        },
        {
          name: 'Daniel Santos',
          description: "Captain Turanga Leela, the competent crew member.",
          image: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Turanga_Leela.png'
        },
        {
          name: 'Maria Paula',
          description: "Bender Bending Rodríguez, bending robot and troublemaker.",
          image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png'
        }
      ]
    }
  ];
  
  mainTabIndex = 0;
  subTabIndex = 1; // Por padrão selecionando "Marge Simpson"
  
  get activeCharacters(): Character[] {
    return this.mainTabs[this.mainTabIndex].characters;
  }
  
  get activeCharacter(): Character {
    return this.activeCharacters[this.subTabIndex];
  }
  
  selectMainTab(i: number) {
    this.mainTabIndex = i;
    this.subTabIndex = 0; // Resetar subtabs ao trocar de categoria
  }
  
  selectSubTab(i: number) {
    this.subTabIndex = i;
  }
}

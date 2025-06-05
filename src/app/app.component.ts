import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { FormCadastroTargetComponent } from './pages/form-cadastro-target/form-cadastro-target.component';

@Component({
  selector: 'app-root',
  standalone: true,
  //schemas: [CUSTOM_ELEMENTS_SCHEMA], // <-- Adicione aqui
  imports: [RouterOutlet, MenuComponent,],
    // FormCadastroTargetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  //  template: `<app-form-cadastro-target></app-form-cadastro-target>`,

})
export class AppComponent {
  title = 'yt-comparator';

  
}

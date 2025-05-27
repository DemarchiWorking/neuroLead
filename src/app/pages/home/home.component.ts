import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { FormCadastroTargetComponent } from '../form-cadastro-target/form-cadastro-target.component';


@Component({
  selector: 'app-home',
  imports: [MenuComponent,FormCadastroTargetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

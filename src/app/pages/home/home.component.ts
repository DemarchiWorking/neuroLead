import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { FormCadastroTargetComponent } from '../form-cadastro-target/form-cadastro-target.component';
import { GrafoSolucoesComponent } from '../../components/graficos/grafo-solucoes/grafo-solucoes.component';


@Component({
  selector: 'app-home',
  imports: [FormCadastroTargetComponent,GrafoSolucoesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

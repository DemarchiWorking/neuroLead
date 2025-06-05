import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // <--- DESCOMENTE E IMPORTE O appConfig
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig) // <--- PASSE O appConfig AQUI
  .catch(err => console.error(err));          // <--- É BOM TER ISSO PARA DEBUGAR ERROS DE INICIALIZAÇÃO
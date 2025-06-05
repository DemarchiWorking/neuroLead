import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Certifique-se que este arquivo existe e exporta suas rotas
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Recomendado
// Ou: import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()), // Configura o HttpClient com a API fetch
    provideRouter(routes),          // Configura suas rotas
    provideClientHydration(withEventReplay()), // Para hidratação do cliente (SSR/SSG)
    provideAnimationsAsync(),       // <--- ADICIONE O PROVEDOR DE ANIMAÇÕES AQUI
    // provideAnimations(),         // Ou use este se preferir a versão síncrona
  ]
};
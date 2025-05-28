import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DadosComponent } from './pages/dados/dados.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'dados',
        component: DadosComponent,
    },

    /*
    {
        path: 'comparer',
        children: [
            {
                path: '',
                component: ComparerComponent,
            },
            {
                path: ':channelA/:channelB',
                resolve: { data: comparerResolver },
                component: ComparerComponent,
            }
        ]
    }*/
];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
        {
        path: '',
        component: HomeComponent,
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

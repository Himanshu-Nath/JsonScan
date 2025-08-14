import { Routes } from '@angular/router';
import { JsonFormat } from './json-format/json-format';

export const routes: Routes = [
    { path: 'json-format', component: JsonFormat },
    { path: '', redirectTo: '/json-format', pathMatch: 'full' },
    { path: '**', redirectTo: 'json-format' },
];

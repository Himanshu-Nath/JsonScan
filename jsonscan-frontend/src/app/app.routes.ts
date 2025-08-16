
import { Routes } from '@angular/router';
import { JsonFormat } from './json-format/json-format';
import { JsonToXml } from './pages/json-to-xml/json-to-xml';
import { QRCode } from './pages/qr-code/qr-code';

export const routes: Routes = [
    { path: '', redirectTo: 'json-format', pathMatch: 'full' },
    { path: 'json-format', component: JsonFormat },
    { path: 'json-to-xml', component: JsonToXml },
    { path: 'qr-code', component: QRCode }
];

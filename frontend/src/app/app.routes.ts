import { Routes } from '@angular/router';
import { ListVoitureComponent } from './components/gestion-voiture/list-voiture/list-voiture.component';
import { DetailVoitureComponent } from './components/gestion-voiture/detail-voiture/detail-voiture.component';

export const routes: Routes = [
    { path: '', component: ListVoitureComponent },
    { path: 'voiture-edit/:id', component: DetailVoitureComponent }

    // { path: 'about', component: Add },
    // { path: 'contact', component: ContactComponent },

];

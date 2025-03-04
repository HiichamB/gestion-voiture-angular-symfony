import { Routes } from '@angular/router';
import { ListVoitureComponent } from './components/gestion-voiture/list-voiture/list-voiture.component';
import { AddVoitureComponent } from './components/gestion-voiture/add-voiture/add-voiture.component';
import { SearchComponent } from './components/gestion-voiture/search/search.component';

export const routes: Routes = [
  { path: '', component: ListVoitureComponent },
  { path: 'voiture/add', component: AddVoitureComponent },
  { path: 'voiture/search', component: SearchComponent },

  { path: 'voiture-edit/:id', component: AddVoitureComponent },
];

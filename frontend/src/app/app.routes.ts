import { Routes } from '@angular/router';
import { ListVoitureComponent } from './components/gestion-voiture/list-voiture/list-voiture.component';
import { AddVoitureComponent } from './components/gestion-voiture/add-voiture/add-voiture.component';

export const routes: Routes = [
  { path: '', component: ListVoitureComponent },
  { path: 'voiture', component: AddVoitureComponent },
  { path: 'voiture-edit/:id', component: AddVoitureComponent },
];

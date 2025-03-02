import { Component, Input } from '@angular/core';
import { Voiture } from '../../../models/voiture..model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-voiture',
  imports: [],
  templateUrl: './card-voiture.component.html',
  styleUrl: './card-voiture.component.scss'
})
export class CardVoitureComponent {
@Input() data!: Voiture

constructor(private router: Router) {}

navigateToDetail(id:string){
  this.router.navigate([`/voitures`, id]);

}

}

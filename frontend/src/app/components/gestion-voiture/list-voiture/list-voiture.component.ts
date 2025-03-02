import { Component } from '@angular/core';
import { CardVoitureComponent } from "../card-voiture/card-voiture.component";
import { Voiture } from '../../../models/voiture..model';
import { VoitureService } from '../../../services/voiture.service';

@Component({
  selector: 'app-list-voiture',
  imports: [CardVoitureComponent],
  templateUrl: './list-voiture.component.html',
  styleUrl: './list-voiture.component.scss'
})
export class ListVoitureComponent {

  voitures: Voiture[] = [];

  constructor(private voitureService: VoitureService) {}

  ngOnInit(): void {
    this.getVoitures();
  }

  getVoitures(): void {
    this.voitureService.getVoitures().subscribe(
      (data) => {
        this.voitures = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des voitures', error);
      }
    );
  }
}

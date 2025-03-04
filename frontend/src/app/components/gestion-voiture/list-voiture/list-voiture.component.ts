import { Component } from '@angular/core';
import { CardVoitureComponent } from '../card-voiture/card-voiture.component';
import { Voiture } from '../../../models/voiture..model';
import { VoitureService } from '../../../services/voiture.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-voiture',
  imports: [CommonModule, CardVoitureComponent, HttpClientModule],
  templateUrl: './list-voiture.component.html',
  styleUrl: './list-voiture.component.scss',
  providers: [VoitureService],
})
export class ListVoitureComponent {
  voitures: Voiture[] = [];

  constructor(private voitureService: VoitureService, private router: Router) {}

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
  navigateToAdd() {
    this.router.navigate([`/voiture/add`]);
  }

  navigateToSearch() {
    this.router.navigate([`/voiture/search`]);
  }
}

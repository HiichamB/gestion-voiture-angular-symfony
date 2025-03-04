import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voiture } from '../models/voiture..model';
@Injectable({
  providedIn: 'root',
})
export class VoitureService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/api';

  getVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(`${this.apiUrl}/voitures`);
  }

  getVoitureById(id: string): Observable<Voiture> {
    return this.http.get<Voiture>(`${this.apiUrl}/voitures/${id}`);
  }

  addVoiture(voiture: Voiture): Observable<Voiture> {
    return this.http.post<Voiture>(`${this.apiUrl}/voitures`, voiture);
  }
  updateVoitureById(id: string, voiture: Voiture) {
    return this.http.patch<Voiture>(`${this.apiUrl}/${id}`, voiture);
  }
  calculateTime(distance: number, model: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/calculate-time`, {
      distance,
      model,
    });
  }
}

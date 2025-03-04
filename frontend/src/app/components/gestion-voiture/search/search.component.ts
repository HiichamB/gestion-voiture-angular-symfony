import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VoitureService } from '../../../services/voiture.service';
import { Voiture } from '../../../models/voiture..model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [VoitureService],
})
export class SearchComponent {
  optionsVoiture: Voiture[] = [];
  temps!: number;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private voitureService: VoitureService
  ) {}
  ngOnInit() {
    this.voitureService
      .getVoitures()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.optionsVoiture = result;
        },
        error: ({ error }: any) => {
          console.error('error', error);
        },
      });

    this.searchForm = this.fb.group({
      model: ['', Validators.required],
      distance: ['', [Validators.required, Validators.min(1)]],
    });
  }

  search() {
    console.log('form', this.searchForm);
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
    } else {
      const searchForm = this.searchForm.value;

      this.voitureService
        .calculateTime(searchForm.model, searchForm.distance)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (result) => {
            this.temps = result;
          },
          error: (error: any) => {},
        });
    }
  }
}

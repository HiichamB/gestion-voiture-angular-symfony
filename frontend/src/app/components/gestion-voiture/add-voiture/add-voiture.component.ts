import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VoitureService } from '../../../services/voiture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Voiture } from '../../../models/voiture..model';
import { CommonModule } from '@angular/common';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-voiture',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-voiture.component.html',
  styleUrl: './add-voiture.component.scss',
})
export class AddVoitureComponent {
  voitureForm!: FormGroup;
  isSubmitting = false;
  id: any = '';
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  constructor(
    private fb: FormBuilder,
    private voitureService: VoitureService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.voitureForm = this.fb.group({
      model: ['', [Validators.required]],
      kmH: ['', [Validators.required]],
      caracteristiques: this.fb.array([]),
    });

    this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (params: any) => {
        this.id = params['id'];
        if (this.id) this.getVoiture();
      },
      error: ({ error }: any) => {
        console.error('error', error);
      },
    });
  }

  getVoiture() {
    this.voitureService
      .getVoitureById(this.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {},
        error: ({ error }: any) => {
          console.error('error', error);
        },
      });
  }
  get caracteristique(): FormArray {
    return this.voitureForm.get('caracteristique') as FormArray;
  }

  addCaracteristique(): void {
    this.caracteristique.push(this.fb.control('', Validators.required));
  }

  deleteCaracteristique(index: number): void {
    this.caracteristique.removeAt(index);
  }

  patchValueIntoForm(data: Voiture) {
    this.voitureForm.patchValue({
      model: data.model,
      kmH: data.kmH,
    });
    this.caracteristique.clear();
    if (data.caracteristiques && data.caracteristiques.length) {
      data.caracteristiques.forEach((char) => {
        this.caracteristique.push(this.fb.control(char, Validators.required));
      });
    }
  }

  addVoiture() {
    if (this.voitureForm.invalid) {
      this.voitureForm.markAllAsTouched();
    } else {
      const voitureForm: Voiture = this.voitureForm.value;
      if (this.id) {
        this.voitureService
          .updateVoitureById(this.id, voitureForm)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: (result) => {},
            error: (error: any) => {},
          });
      } else {
        this.voitureService
          .addVoiture(voitureForm)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: (result) => {
              this.id = result._id;
            },
            error: (error: any) => {},
          });
      }
    }
  }
}

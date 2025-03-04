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
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-voiture',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-voiture.component.html',
  styleUrl: './add-voiture.component.scss',
  providers: [VoitureService],
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
  get caracteristiques(): FormArray {
    return this.voitureForm.get('caracteristiques') as FormArray;
  }

  addCaracteristique(char?: any): void {
    if (this.caracteristiques.valid) {
      this.caracteristiques.push(
        this.fb.group({
          nom: ['', [Validators.required]],
          valeur: ['', [Validators.required]],
        })
      );
      if (char) {
        this.caracteristiques.controls[
          this.caracteristiques.length - 1
        ].patchValue(char);
      }
    }
  }

  deleteCaracteristique(index: number): void {
    this.caracteristiques.removeAt(index);
  }

  patchValueIntoForm(data: Voiture) {
    this.voitureForm.patchValue({
      model: data.model,
      kmH: data.kmH,
    });
    this.caracteristiques.clear();
    if (data.caracteristiques && data.caracteristiques.length) {
      data.caracteristiques.forEach((char) => {
        this.addCaracteristique(char);
      });
    }
  }

  addVoiture() {
    console.log('form', this.voitureForm);
    if (this.voitureForm.invalid) {
      this.voitureForm.markAllAsTouched();
    } else {
      const voitureForm: Voiture = this.voitureForm.value;
      if (this.id) {
        this.voitureService
          .updateVoitureById(this.id, voitureForm)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: (result) => {
              this.id = result._id;
            },
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

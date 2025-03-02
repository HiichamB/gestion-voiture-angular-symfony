import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVoitureComponent } from './card-voiture.component';

describe('CardVoitureComponent', () => {
  let component: CardVoitureComponent;
  let fixture: ComponentFixture<CardVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

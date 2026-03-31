import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionStep } from './decision-step';

describe('DecisionStep', () => {
  let component: DecisionStep;
  let fixture: ComponentFixture<DecisionStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionStep],
    }).compileComponents();

    fixture = TestBed.createComponent(DecisionStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

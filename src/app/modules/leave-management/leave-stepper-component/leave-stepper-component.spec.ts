import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStepperComponent } from './leave-stepper-component';

describe('LeaveStepperComponent', () => {
  let component: LeaveStepperComponent;
  let fixture: ComponentFixture<LeaveStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveStepperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

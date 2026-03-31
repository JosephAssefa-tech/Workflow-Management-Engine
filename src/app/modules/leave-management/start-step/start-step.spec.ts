import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStep } from './start-step';

describe('StartStep', () => {
  let component: StartStep;
  let fixture: ComponentFixture<StartStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartStep],
    }).compileComponents();

    fixture = TestBed.createComponent(StartStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

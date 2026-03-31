import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultStep } from './default-step';

describe('DefaultStep', () => {
  let component: DefaultStep;
  let fixture: ComponentFixture<DefaultStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultStep],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStepDirective } from './dynamic-step-directive';

describe('DynamicStepDirective', () => {
  let component: DynamicStepDirective;
  let fixture: ComponentFixture<DynamicStepDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicStepDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicStepDirective);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

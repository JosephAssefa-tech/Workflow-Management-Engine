import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDashboard } from './workflow-dashboard';

describe('WorkflowDashboard', () => {
  let component: WorkflowDashboard;
  let fixture: ComponentFixture<WorkflowDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

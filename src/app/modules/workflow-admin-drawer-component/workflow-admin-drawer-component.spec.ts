import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAdminDrawerComponent } from './workflow-admin-drawer-component';

describe('WorkflowAdminDrawerComponent', () => {
  let component: WorkflowAdminDrawerComponent;
  let fixture: ComponentFixture<WorkflowAdminDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowAdminDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowAdminDrawerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

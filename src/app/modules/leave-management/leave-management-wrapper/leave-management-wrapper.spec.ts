import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveManagementWrapper } from './leave-management-wrapper';

describe('LeaveManagementWrapper', () => {
  let component: LeaveManagementWrapper;
  let fixture: ComponentFixture<LeaveManagementWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveManagementWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveManagementWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

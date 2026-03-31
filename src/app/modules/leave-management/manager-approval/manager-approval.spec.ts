import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerApproval } from './manager-approval';

describe('ManagerApproval', () => {
  let component: ManagerApproval;
  let fixture: ComponentFixture<ManagerApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerApproval],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

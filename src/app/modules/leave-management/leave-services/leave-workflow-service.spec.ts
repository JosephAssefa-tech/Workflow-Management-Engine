import { TestBed } from '@angular/core/testing';

import { LeaveWorkflowService } from './leave-workflow-service';

describe('LeaveWorkflowService', () => {
  let service: LeaveWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

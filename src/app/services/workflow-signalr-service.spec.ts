import { TestBed } from '@angular/core/testing';

import { WorkflowSignalrService } from './workflow-signalr-service';

describe('WorkflowSignalrService', () => {
  let service: WorkflowSignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowSignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

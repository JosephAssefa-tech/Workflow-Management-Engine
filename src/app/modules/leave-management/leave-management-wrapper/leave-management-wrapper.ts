import { Component, OnInit } from '@angular/core';
import { LeaveWorkflow } from '../leave-models/workflow';
import { LeaveWorkflowService } from '../leave-services/leave-workflow-service';
import { WorkflowStateService } from '../leave-services/WorkflowStateService';

@Component({
  selector: 'app-leave-management-wrapper',
  standalone: false,
  templateUrl: './leave-management-wrapper.html',
  styleUrl: './leave-management-wrapper.css',
})
export class LeaveManagementWrapper implements OnInit {
 workflow!: LeaveWorkflow;
definationId='bbdcdaa82f0d6315';
instanceId!: string; 

  constructor(private leaveWorkflowService: LeaveWorkflowService,    private state: WorkflowStateService,) {}

  ngOnInit(): void {
   
    this.leaveWorkflowService
      .getWorkflow(this.definationId)
      .subscribe(workflow => {
        this.workflow = workflow;
      });
this.instanceId = localStorage.getItem('workflowInstanceId')!;

  }
  
}

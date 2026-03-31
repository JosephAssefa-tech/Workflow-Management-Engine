import { Component, OnInit } from '@angular/core';
import { LeaveWorkflow } from '../leave-models/workflow';
import { LeaveWorkflowService } from '../leave-services/leave-workflow-service';

@Component({
  selector: 'app-leave-management-wrapper',
  standalone: false,
  templateUrl: './leave-management-wrapper.html',
  styleUrl: './leave-management-wrapper.css',
})
export class LeaveManagementWrapper implements OnInit {
 workflow!: LeaveWorkflow;

  constructor(private leaveWorkflowService: LeaveWorkflowService) {}

  ngOnInit(): void {
    this.leaveWorkflowService
      .getWorkflow('bbdcdaa82f0d6315')
      .subscribe(workflow => {
        this.workflow = workflow;
      });
  }
}

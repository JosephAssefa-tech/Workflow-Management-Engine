import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../../services/workflow-service';
import { ToastrService } from 'ngx-toastr';
import { WorkflowSignalrService } from '../../../services/workflow-signalr-service';

@Component({
  selector: 'app-workflow-dashboard',
  standalone: false,
  templateUrl: './workflow-dashboard.html',
  styleUrl: './workflow-dashboard.css',
})
export class WorkflowDashboard  implements OnInit{
   workflows: any[] = [];
   displayedColumns: string[] = [
  'workflowName',
  'status',
  'version',
  'createdAt',
  'lastExecutedAt',
  'actions'
];

  constructor(
    private workflowApi: WorkflowService,
    private workflowHub: WorkflowSignalrService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadWorkflows();

    // Subscribe to SignalR for live updates
    this.workflowHub.workflowStarted$.subscribe(instanceId => {
      this.toastr.info(`Workflow started: ${instanceId}`);
      this.loadWorkflows(); // reload list
    });
  }

  loadWorkflows() {
    this.workflowApi.getInstances().subscribe({
      next: (data) => this.workflows = data,
      error: () => this.toastr.error('Failed to load workflows')
    });
  }
  startWorkflow(definitionId: string) {
  if (!definitionId) {
    this.toastr.error('Workflow definition ID missing');
    return;
  }

  this.workflowApi.startWorkflow(definitionId).subscribe({
    next: (res: any) => {
      this.toastr.success(`Workflow started: ${res.InstanceId}`);
      this.loadWorkflows(); 
    },
    error: (err) => {
      console.error(err);
      this.toastr.error('Failed to start workflow');
    }
  });
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowService } from '../../../services/workflow-service';
import { ToastrService } from 'ngx-toastr';
import { WorkflowSignalrService } from '../../../services/workflow-signalr-service';
import { forkJoin } from 'rxjs';

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
  'next',
  'version',
  'createdAt',
  'lastExecutedAt',
  'actions'
];

  constructor(
    private workflowApi: WorkflowService,
    private workflowHub: WorkflowSignalrService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadWorkflows();

    // Subscribe to SignalR for live updates
    this.workflowHub.workflowStarted$.subscribe(instanceId => {
      this.toastr.info(`Workflow started: ${instanceId}`);
      this.loadWorkflows(); // reload list
    });
  }

// loadWorkflows() {
//   this.workflowApi.getInstances().subscribe({
//     next: (data) => {
//       console.log('Workflows response:', data); 
//       this.workflows = data.items;
//     },
//     error: () => this.toastr.error('Failed to load workflows')
//   });
// }
loadWorkflows() {
  forkJoin({
    instances: this.workflowApi.getInstances(),
    definitions: this.workflowApi.getDefinitions()
  }).subscribe(({ instances, definitions }) => {

const map = definitions.items
  .filter((def: any) => def.isLatest) 
  .reduce((acc: any, def: any) => {
    acc[def.definitionId] = def.name; 
    return acc;
  }, {});

    this.workflows = instances.items.map((wf: any) => ({
      ...wf,
      workflowName: map[wf.definitionId]
    }));

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

  openWorkflow(instanceId: string) {
    if (!instanceId) {
      this.toastr.error('Workflow instance ID missing');
      return;
    }

    this.router.navigate(['/workflows/leave-request'], {
      queryParams: { instanceId }
    });
  }
}

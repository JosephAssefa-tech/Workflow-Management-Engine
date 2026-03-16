import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Workflow {
  id: string;
  name: string;
  lastModified: string;
}



@Component({
  selector: 'app-workflow-admin-drawer-component',
  standalone: false,
  templateUrl: './workflow-admin-drawer-component.html',
  styleUrl: './workflow-admin-drawer-component.css',
})
export class WorkflowAdminDrawerComponent {
  isDrawerOpen = true; 
  isDrawerExpanded = true; 
  activePanel: 'designer' | 'list' | 'more' = 'designer';
  selectedWorkflowXml: string | null = null;
displayedColumns: string[] = ['name', 'lastModified', 'actions'];
  // Mock workflow data
  workflows: Workflow[] = [
    { id: 'wf_1', name: 'Onboarding Process', lastModified: '2026-03-12' },
    { id: 'wf_2', name: 'Leave Approval', lastModified: '2026-03-10' },
    { id: 'wf_3', name: 'Expense Reimbursement', lastModified: '2026-03-08' }
  ];
  dataSource = new MatTableDataSource(this.workflows);
toggleDrawer() {
  this.isDrawerOpen = !this.isDrawerOpen;
}
  onCreateNew() {
    this.selectedWorkflowXml = null;
    this.activePanel = 'designer';
  }

  onViewList() {
    this.activePanel = 'list';
  }

  onMore() {
    this.activePanel = 'more';
  }

  onWorkflowSelected(workflow: Workflow) {
    // For mock, just show a placeholder XML
    this.selectedWorkflowXml = `<bpmn:definitions id="${workflow.id}" name="${workflow.name}"></bpmn:definitions>`;
    this.activePanel = 'designer';
  }

  onWorkflowSaved(xml: string) {
    console.log('Workflow saved:', xml);
  }
  
  
}

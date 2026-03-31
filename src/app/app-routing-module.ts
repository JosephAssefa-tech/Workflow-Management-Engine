import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowAdminDrawerComponent } from './modules/workflow-admin-drawer-component/workflow-admin-drawer-component';
import { BpmnModeler } from './modules/workflow-designer/bpmn-modeler/bpmn-modeler';
import { WorkflowList } from './modules/workflows/workflow-list/workflow-list';
import { WorkflowDashboard } from './modules/dashboard/workflow-dashboard/workflow-dashboard';
import { LeaveStepperComponent } from './modules/leave-management/leave-stepper-component/leave-stepper-component';
import { LeaveManagementWrapper } from './modules/leave-management/leave-management-wrapper/leave-management-wrapper';

const routes: Routes = [
  {
    path: 'workflows',
    component: WorkflowAdminDrawerComponent,

    children: [
      { path: 'list', component: WorkflowList }, 
      { path: 'designer/:id', component: BpmnModeler }, 
      { path: 'designer/new', component: BpmnModeler },
      {path: 'leave-request', component: LeaveManagementWrapper},
       {path: 'dashboard', component: WorkflowDashboard},
      { path: 'more', component: WorkflowAdminDrawerComponent }
    ]
  },
  { path: '', redirectTo: 'workflows/designer/new', pathMatch: 'full' },
  { path: '**', redirectTo: 'workflowsdesigner/new' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

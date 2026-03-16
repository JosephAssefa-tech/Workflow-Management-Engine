import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowAdminDrawerComponent } from './modules/workflow-admin-drawer-component/workflow-admin-drawer-component';
import { BpmnModeler } from './modules/workflow-designer/bpmn-modeler/bpmn-modeler';
import { WorkflowList } from './modules/workflows/workflow-list/workflow-list';

const routes: Routes = [
  {
    path: 'workflows',
    component: WorkflowAdminDrawerComponent,
    children: [
      { path: 'list', component: WorkflowList }, 
      { path: 'designer/:id', component: BpmnModeler }, 
      { path: 'designer/new', component: BpmnModeler },
      { path: 'more', component: WorkflowAdminDrawerComponent }
    ]
  },
  { path: '', redirectTo: 'workflows/designer/new', pathMatch: 'full' },
  { path: '**', redirectTo: 'workflowsdesigner/new' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

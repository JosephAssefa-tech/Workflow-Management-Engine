import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- required for Material
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BpmnModeler } from './modules/workflow-designer/bpmn-modeler/bpmn-modeler';
import { WorkflowAdminDrawerComponent } from './modules/workflow-admin-drawer-component/workflow-admin-drawer-component';
import { MatTableModule } from '@angular/material/table';
// Angular Material Modules needed for admin drawer
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { WorkflowList } from './modules/workflows/workflow-list/workflow-list';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [App, BpmnModeler, WorkflowAdminDrawerComponent, WorkflowList],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    AppRoutingModule,
    FormsModule,
HttpClientModule,
    // Material
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

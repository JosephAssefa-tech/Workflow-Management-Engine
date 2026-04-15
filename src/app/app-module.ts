import { NgModule, NO_ERRORS_SCHEMA, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- required for Material
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BpmnModeler } from './modules/workflow-designer/bpmn-modeler/bpmn-modeler';
import { WorkflowAdminDrawerComponent } from './modules/workflow-admin-drawer-component/workflow-admin-drawer-component';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { WorkflowList } from './modules/workflows/workflow-list/workflow-list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkflowDashboard } from './modules/dashboard/workflow-dashboard/workflow-dashboard';
import { WorkflowStepperComponent } from './modules/components/workflow-stepper-component/workflow-stepper-component';
import { LeaveStepperComponent } from './modules/leave-management/leave-stepper-component/leave-stepper-component';
import { MatStepperModule } from '@angular/material/stepper';
import { LeaveManagementWrapper } from './modules/leave-management/leave-management-wrapper/leave-management-wrapper';
import { AuthInterceptor } from './auth/auth-interceptor';
import { StartStep } from './modules/leave-management/start-step/start-step';
import { ManagerApproval } from './modules/leave-management/manager-approval/manager-approval';
import { HrApproval } from './modules/leave-management/hr-approval/hr-approval';
import { DefaultStep } from './modules/leave-management/default-step/default-step';
import { DecisionStep } from './modules/leave-management/decision-step/decision-step';
import { DynamicStepDirective } from './modules/leave-management/dynamic-step-directive/dynamic-step-directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // <-- add this
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    App,
    BpmnModeler,
    WorkflowAdminDrawerComponent,
    WorkflowList,
    WorkflowDashboard,
    WorkflowStepperComponent,
    LeaveStepperComponent,
    LeaveManagementWrapper,
    StartStep,
    ManagerApproval,
    HrApproval,
    DefaultStep,
    DecisionStep,
    DynamicStepDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    // Material
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatStepperModule,
    
    ToastrModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ],
   schemas: [NO_ERRORS_SCHEMA],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BpmnModeler } from './modules/workflow-designer/bpmn-modeler/bpmn-modeler';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [App, BpmnModeler],
  imports: [BrowserModule, AppRoutingModule, MatSlideToggleModule, FormsModule, MatIconModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

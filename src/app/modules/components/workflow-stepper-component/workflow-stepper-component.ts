import { Component } from '@angular/core';
import { WorkflowService } from '../../../services/workflow-service';

@Component({
  selector: 'app-workflow-stepper-component',
  standalone: false,
  templateUrl: './workflow-stepper-component.html',
  styleUrl: './workflow-stepper-component.css',
})
export class WorkflowStepperComponent {
   workflowId = 'YOUR_WORKFLOW_ID';
  currentTaskId = 'START_TASK_ID';
  nextTasks: string[] = [];
  prevTasks: string[] = [];

    constructor(private navService: WorkflowService) {}

  ngOnInit() {
    this.loadNavigation();
  }

    loadNavigation(inputData?: Record<string, any>) {
    this.navService.getNavigation(this.workflowId, {
      currentTaskId: this.currentTaskId,
      inputData
    }).subscribe(res => {
      this.nextTasks = res.nextTaskIds;
      this.prevTasks = res.previousTaskIds;
    });
  }

  goToNext(taskId: string) {
    this.currentTaskId = taskId;
    this.loadNavigation();
  }

  goToPrev(taskId: string) {
    this.currentTaskId = taskId;
    this.loadNavigation();
  }

}

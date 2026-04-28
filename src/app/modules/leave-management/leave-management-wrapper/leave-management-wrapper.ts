import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveWorkflow } from '../leave-models/workflow';
import { LeaveWorkflowService } from '../leave-services/leave-workflow-service';

@Component({
  selector: 'app-leave-management-wrapper',
  standalone: false,
  templateUrl: './leave-management-wrapper.html',
  styleUrl: './leave-management-wrapper.css',
})
export class LeaveManagementWrapper implements OnInit {
  workflowDefinition!: LeaveWorkflow;
  currentStep: any;
  definationId = 'bbdcdaa82f0d6315';
  instanceId = '';

  constructor(
    private leaveWorkflowService: LeaveWorkflowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.leaveWorkflowService
      .getWorkflow(this.definationId)
      .subscribe(workflow => {
        this.workflowDefinition = workflow;
        console.log('Loaded workflow definition with steps:', workflow.steps);

        const resumeInstanceId = this.normalizeInstanceId(this.route.snapshot.queryParamMap.get('instanceId'));
        if (resumeInstanceId) {
          this.instanceId = resumeInstanceId;
          this.loadCurrentStep(resumeInstanceId);
        } else {
          this.setStartStep();
        }
      });
  }

  onWorkflowInstanceCreated(instanceId: string) {
    console.log('Wrapper received new workflow instance:', instanceId);
    this.instanceId = instanceId;
    this.loadCurrentStep(instanceId);
  }

  resumeInstance(instanceId: string) {
    const normalizedId = this.normalizeInstanceId(instanceId);
    if (!normalizedId) {
      console.warn('Cannot resume workflow: invalid instanceId', instanceId);
      return;
    }

    console.log('Resuming workflow instance:', normalizedId);
    this.instanceId = normalizedId;
    this.loadCurrentStep(normalizedId);
  }

  private normalizeInstanceId(rawId: string | null): string {
    if (!rawId) return '';
    const trimmed = rawId.trim();
    if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return '';
    return trimmed;
  }

  private loadCurrentStep(instanceId: string) {
    this.leaveWorkflowService.getWorkflowInstance(instanceId).subscribe(instance => {
      const state = instance?.workflowState ?? instance;

      let activityId =
        state?.blockingActivities?.[0]?.activityId ||
        state?.blockingActivities?.[0]?.id;

      if (!activityId && state?.bookmarks?.length > 0) {
        activityId = state.bookmarks[0].activityId || state.bookmarks[0].activityInstanceId;
      }

      if (!activityId) {
        activityId =
          state?.currentActivity?.activityId ||
          state?.currentActivity?.id ||
          state?.activity?.activityId ||
          state?.activity?.id;
      }


      if (activityId && this.workflowDefinition?.steps) {
        this.currentStep = this.workflowDefinition.steps.find((step: any) => step.id === activityId);

      }

      if (!this.currentStep) {
        console.warn('Failed to resolve current Elsa activity', activityId, instance);
        this.setStartStep();
      }
    }, error => {
      console.error('Failed to load workflow instance:', error);
      this.setStartStep();
    });
  }

  private setStartStep() {
    if (this.workflowDefinition?.steps) {
      this.currentStep = this.workflowDefinition.steps.find(s => s.type === 'Elsa.Start');
      if (!this.currentStep) {
        console.warn('No Elsa.Start step found in workflow');
      }
    }
  }
}

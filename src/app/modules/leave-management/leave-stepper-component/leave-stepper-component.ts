// leave-stepper.component.ts
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { STEP_COMPONENT_MAP } from '../mapping/step-component-map';
import { DefaultStep } from '../default-step/default-step';
import { BehaviorSubject } from 'rxjs';
import { LeaveWorkflowService } from '../leave-services/leave-workflow-service';


@Component({
  selector: 'app-leave-stepper-component',
  standalone: false,
  templateUrl: './leave-stepper-component.html',
  styleUrl: './leave-stepper-component.css',
})
export class LeaveStepperComponent implements OnInit, OnChanges {
  visibleSteps: any[] = [];
selectedIndex = 0;
  workflowInstanceId$ = new BehaviorSubject<string | null>(null);
  @Input() workflow: any;
  @Input() currentStep: any;
  @Input() workflowInstanceId!: string;
  @Output() workflowInstanceCreated = new EventEmitter<string>();

  constructor(private cd: ChangeDetectorRef, private leaveWorkflowService: LeaveWorkflowService) {}

  ngOnInit() {
      this.prepareSteps();
    if (this.workflowInstanceId && this.isValidInstanceId(this.workflowInstanceId)) {
      this.workflowInstanceId$.next(this.workflowInstanceId);
    }

    console.log('Stepper instanceId:', this.workflowInstanceId);
  }

ngOnChanges(changes: SimpleChanges) {

  if (changes['workflow'] || changes['currentStep']) {
    this.prepareSteps();
  }

  if (changes['workflowInstanceId'] &&
      this.isValidInstanceId(this.workflowInstanceId)) {
    this.workflowInstanceId$.next(this.workflowInstanceId);
  }

  console.log('workflow:', this.workflow);
  console.log('currentStep:', this.currentStep);
  console.log('visibleSteps:', this.visibleSteps);
}
prepareSteps() {
  if (!this.workflow?.steps?.length) return;

  const ignoredTypes = [
    'Elsa.End',
    'Elsa.FlowDecision'
  ];

  const ignoredNames = [
    'End',
    'End1',
    'End3'
  ];

  const filtered = this.workflow.steps.filter(step => {
    return (
      !ignoredTypes.includes(step.type) &&
      !ignoredNames.includes(step.name)
    );
  });

  // IMPORTANT: remove duplicates (your graph has duplicates)
  const unique = Array.from(
    new Map(filtered.map(s => [s.id, s])).values()
  );

  this.visibleSteps = unique;

  const currentIndex = this.visibleSteps.findIndex(
    s => s.id === this.currentStep?.id
  );

  this.selectedIndex = currentIndex >= 0 ? currentIndex : 0;

  console.log('CLEAN UI steps:', this.visibleSteps);
}
isBusinessStep(step: any): boolean {
  const hidden = [
    'Elsa.Start',
    'Elsa.End',
    'Elsa.Event',
    'Elsa.FlowDecision'
  ];

  return !hidden.includes(step.type);
}
  goNext(data?: any) {
    if (data) {
      const instanceId = typeof data === 'string' ? data : data.workflowInstanceId;

      if (this.isValidInstanceId(instanceId)) {
        this.workflowInstanceId = instanceId;
        this.workflowInstanceId$.next(instanceId);
        console.log('Updated workflowInstanceId$', instanceId);
        // Notify parent component that a new workflow instance was created
        this.workflowInstanceCreated.emit(instanceId);
        // Refresh current step after workflow progresses
        this.loadCurrentStep();
      } else {
        console.warn('Received invalid workflowInstanceId in goNext:', instanceId);
      }
    }
  }

  handleDecision(decision: boolean) {
    // After a decision-based resume, refresh the current active step from Elsa.
    this.loadCurrentStep();
  }

  private loadCurrentStep() {
    if (!this.workflow?.steps || !this.isValidInstanceId(this.workflowInstanceId)) {
      console.warn('Cannot load current step: invalid workflow or instanceId');
      return;
    }

    this.leaveWorkflowService.getWorkflowInstance(this.workflowInstanceId).subscribe(instance => {
      const state = instance?.workflowState ?? instance;

      // First try blockingActivities (for suspended workflows waiting for input)
      let activityId =
        state?.blockingActivities?.[0]?.activityId ||
        state?.blockingActivities?.[0]?.id;

      // If no blocking activities, check bookmarks (for event-based waiting)
      if (!activityId && state?.bookmarks?.length > 0) {
        activityId = state.bookmarks[0].activityId || state.bookmarks[0].activityInstanceId;
      }

      // Fallback to currentActivity or activity
      if (!activityId) {
        activityId =
          state?.currentActivity?.activityId ||
          state?.currentActivity?.id ||
          state?.activity?.activityId ||
          state?.activity?.id;
      }

      console.log('Stepper resolving current step for activityId:', activityId, 'from instance:', instance);

if (activityId) {
  this.currentStep = this.workflow.steps.find(
    (step: any) => step.id === activityId
  );

  this.prepareSteps();     // recalculate visible steps + selected index
  this.cd.detectChanges(); // refresh UI
}

      if (!this.currentStep) {
        console.warn('Unable to resolve current Elsa step for instance', this.workflowInstanceId, activityId, instance);
      }
    }, error => {
      console.error('Failed to load current workflow instance state', error);
    });
  }

  private isValidInstanceId(id: string | null | undefined): id is string {
    return !!id && id !== 'undefined' && id !== 'null';
  }

  getDisplayName(step: any): string {
    return step?.displayName || step?.name || step?.type || 'Unknown Step';
  }

  getComponentForStep(step: any) {
    const component = (
      STEP_COMPONENT_MAP[step.displayName] ||
      STEP_COMPONENT_MAP[step.name] ||
      STEP_COMPONENT_MAP[step.type] ||
      DefaultStep
    );
    console.log('Mapping step:', step, 'to component:', component.name);
    return component;
  }
}
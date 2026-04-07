// leave-stepper.component.ts
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { STEP_COMPONENT_MAP } from '../mapping/step-component-map';
import { DefaultStep } from '../default-step/default-step';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-leave-stepper-component',
  standalone: false,
  templateUrl: './leave-stepper-component.html',
  styleUrl: './leave-stepper-component.css',
})
export class LeaveStepperComponent implements OnInit {
  workflowInstanceId$ = new BehaviorSubject<string | null>(null);
  @Input() workflow: any; // Will have steps and connections properties
  @ViewChild('stepper') stepper: MatStepper;
  @Input() workflowInstanceId!: string;
  orderedSteps: any[] = [];
  currentStepIndex = 0;
  constructor(private cd: ChangeDetectorRef) {}
ngOnInit() {
      if (this.workflowInstanceId) {
      this.workflowInstanceId$.next(this.workflowInstanceId);
    }
 console.log('Stepper instanceId:', this.workflowInstanceId);

  if (this.workflow?.root) {
    this.workflow = this.normalizeWorkflow(this.workflow);
  }

  if (this.workflow?.steps && this.workflow?.connections) {
    this.orderedSteps = this.getOrderedSteps();
  } else {
    console.error('Invalid workflow structure:', this.workflow);
    this.orderedSteps = [];
  }
  
}

  getOrderedSteps(): any[] {
    const steps: any[] = [];
    const stepsMap = new Map();
    
    // Create a map for quick lookup
    this.workflow.steps.forEach((step: any) => {
      stepsMap.set(step.id, step);
    });
    
    // Find the start step (type 'Start' or name 'Start1')
let startStep = this.workflow.steps.find(
  (s: any) => s.type === 'Elsa.Start'
);
    
    // If no explicit start, find the step with no incoming connections
    if (!startStep) {
      const allTargetIds = new Set();
      this.workflow.connections.forEach((conn: any) => {
        allTargetIds.add(conn.targetActivityId);
      });
      
      startStep = this.workflow.steps.find((s: any) => !allTargetIds.has(s.id));
    }
    
    if (!startStep) {
      console.warn('No start step found, using steps in original order');
      return this.workflow.steps;
    }
    
    // Traverse the workflow
    let currentStep = startStep;
    const visited = new Set();
    
    while (currentStep && !visited.has(currentStep.id)) {
      visited.add(currentStep.id);
      steps.push(currentStep);
      
      // Find outgoing connections from current step
      const outgoingConnections = this.workflow.connections.filter(
        (conn: any) => conn.sourceActivityId === currentStep.id
      );
      
      if (outgoingConnections.length === 0) {
        break; // No more connections
      }
      
      // For decision steps, we don't auto-navigate - user chooses path
      if (currentStep.type === 'FlowDecision') {
        break;
      }
      
      // For regular steps, follow the 'Done' port
      const doneConnection = outgoingConnections.find(
        (conn: any) => conn.sourcePort === 'Done' || !conn.sourcePort
      );
      
      if (doneConnection) {
        const nextStep = stepsMap.get(doneConnection.targetActivityId);
        currentStep = nextStep;
      } else {
        break;
      }
    }
    
    return steps;
  }
updateInstanceId(id: string) {
  console.log('Stepper updating workflowInstanceId:', id);
  this.workflowInstanceId$.next(id);
}

goNext(data?: any) {
  const currentStep = this.orderedSteps[this.currentStepIndex];

  // Update the BehaviorSubject with the workflowInstanceId if present
  if (data) {
    const instanceId =
      typeof data === 'string'
        ? data
        : data.workflowInstanceId;

    if (instanceId) {
      this.workflowInstanceId$.next(instanceId);
      console.log('Updated workflowInstanceId$', instanceId);
    }
  }

  // --- existing code to move to next step ---
  const outgoingConnections = this.workflow.connections.filter(
    (conn: any) => conn.sourceActivityId === currentStep.id
  );

  const doneConnection = outgoingConnections.find(
    (conn: any) => conn.sourcePort === 'Done' || !conn.sourcePort
  );

  if (doneConnection) {
    const nextIndex = this.orderedSteps.findIndex(
      (s: any) => s.id === doneConnection.targetActivityId
    );

    if (nextIndex !== -1) {
      this.currentStepIndex = nextIndex;
      if (this.stepper) this.stepper.selectedIndex = this.currentStepIndex;
    } else {
      const nextStep = this.workflow.steps.find(
        (s: any) => s.id === doneConnection.targetActivityId
      );
      if (nextStep) {
        this.orderedSteps.push(nextStep);
        this.currentStepIndex = this.orderedSteps.length - 1;
        if (this.stepper) this.stepper.selectedIndex = this.currentStepIndex;
      }
    }
  }
}
  goBack() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      if (this.stepper) {
        this.stepper.selectedIndex = this.currentStepIndex;
      }
    }
  }

handleDecision(decision: boolean) {
  const currentStep = this.orderedSteps[this.currentStepIndex];

  const connection = this.workflow.connections.find(
    (conn: any) =>
      conn.sourceActivityId === currentStep.id &&
      conn.sourcePort === (decision ? 'True' : 'False')
  );

  if (!connection) {
    console.error('No connection found for decision:', decision);
    return;
  }

  const targetStep = this.workflow.steps.find(
    s => s.id === connection.targetActivityId
  );

  if (!targetStep) {
    console.error('Target step not found');
    return;
  }

  let nextIndex = this.orderedSteps.findIndex(
    s => s.id === targetStep.id
  );

  // ✅ Add step if missing
  if (nextIndex === -1) {
    this.addStepAndFollowing(targetStep);

    nextIndex = this.orderedSteps.findIndex(
      s => s.id === targetStep.id
    );
  }

  // ❗ CRITICAL FIX: validate index before assigning
  if (nextIndex === -1) {
    console.error('Step still not found after adding:', targetStep);
    return;
  }

  this.currentStepIndex = nextIndex;

  if (this.stepper && nextIndex < this.orderedSteps.length) {
    this.stepper.selectedIndex = nextIndex;
  } else {
    console.error('Invalid step index:', nextIndex);
  }
}
  
  addStepAndFollowing(step: any) {
    const stepsMap = new Map();
    this.workflow.steps.forEach((s: any) => {
      stepsMap.set(s.id, s);
    });
    
    const visited = new Set();
    let currentStep = step;
    
    while (currentStep && !visited.has(currentStep.id)) {
      visited.add(currentStep.id);
      
      // Only add if not already in orderedSteps
      if (!this.orderedSteps.find((s: any) => s.id === currentStep.id)) {
        this.orderedSteps.push(currentStep);
      }
      
      // Find next step
      const outgoingConnections = this.workflow.connections.filter(
        (conn: any) => conn.sourceActivityId === currentStep.id
      );
      
      const doneConnection = outgoingConnections.find(
        (conn: any) => conn.sourcePort === 'Done' || !conn.sourcePort
      );
      
      if (doneConnection) {
        currentStep = stepsMap.get(doneConnection.targetActivityId);
      } else {
        break;
      }
    }
  }
  
  getDisplayName(step: any): string {
    // Use displayName if available

     return step.displayName || step.name || step.type;
  
    

  }
  
isDecisionStep(step: any): boolean {
  return step.type.includes('FlowDecision');
}

isFlowNode(step: any): boolean {
  return step.type.includes('FlowNode');
}

isStartStep(step: any): boolean {
  return step.type.includes('Start');
}

isEndStep(step: any): boolean {
  return step.type.includes('End');
}

  normalizeWorkflow(workflow: any) {
  if (!workflow?.root) return null;

  return {
    steps: workflow.root.activities.map((a: any) => ({
      id: a.id,
      name: a.name,
      type: a.type,
      displayName: a.metadata?.displayText || a.name,
      raw: a
    })),
    connections: workflow.root.connections.map((c: any) => ({
      sourceActivityId: c.source.activity,
      targetActivityId: c.target.activity,
      sourcePort: c.source.port,
      targetPort: c.target.port
    }))
  };
}
getComponentForStep(step: any) {
  return (
    STEP_COMPONENT_MAP[step.type] ||
    STEP_COMPONENT_MAP[step.name] ||
    DefaultStep
  );
}
}
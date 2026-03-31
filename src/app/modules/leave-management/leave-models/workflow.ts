// workflow.models.ts
export interface WorkflowStep {
  id: string;
  name: string;
  type: string; // Start, FlowNode, FlowDecision, End
}

export interface WorkflowConnection {
  sourceActivityId: string;
  sourcePort: string; // Done, True, False
  targetActivityId: string;
}

export interface LeaveWorkflow {
  steps: WorkflowStep[];
  connections: WorkflowConnection[];
}
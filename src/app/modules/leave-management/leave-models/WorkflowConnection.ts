// workflow.model.ts
export interface WorkflowConnection {
  source: {
    activity: string;
    port: string;
  };
  target: {
    activity: string;
    port: string;
  };
  vertices?: any[];
}

export interface WorkflowActivity {
  id: string;
  nodeId: string;
  name: string;
  type: string;
  version: number;
  customProperties: any;
  metadata: {
    designer?: {
      position: { x: number; y: number };
      size: { width: number; height: number };
    };
    displayText?: string;
  };
  condition?: {
    typeName: string;
    expression: {
      type: string;
      value: string;
    };
  };
  body?: any;
}

export interface LeaveWorkflow {
  activities: WorkflowActivity[];
  connections: WorkflowConnection[];
  id: string;
  definitionId: string;
  name: string;
  createdAt: string;
  version: number;
  toolVersion: string;
  // ... other properties
}
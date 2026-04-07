export interface WorkflowNavigationRequest {
  currentTaskId: string;
  inputData?: Record<string, any>; // optional input for conditional flows
}

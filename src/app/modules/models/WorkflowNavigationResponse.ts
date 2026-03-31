export interface WorkflowNavigationResponse {
  currentTaskId: string;
  nextTaskIds: string[];
  previousTaskIds: string[];
}
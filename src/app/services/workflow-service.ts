import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkflowNavigationResponse } from '../modules/models/WorkflowNavigationResponse';
import { WorkflowNavigationRequest } from '../modules/models/WorkflowNavigationRequest';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  baseUrl="http://localhost:5067/workflows";
  baseUrlInstances="https://localhost:14658/elsa/api/workflow-instances";
  constructor(private http: HttpClient) {}

  saveWorkflow(payload: any) {
    return this.http.post('/workflows/save', payload);
  }

startWorkflow(definitionId: string) {
  return this.http.post(`${this.baseUrl}/start/${definitionId}`, {});
}

getInstances(): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrlInstances}`);
 }

  getInstance(instanceId: string) {
    return this.http.get(`${this.baseUrl}/instances/${instanceId}`);
  }

  resumeWorkflow(instanceId: string) {
    return this.http.post(`${this.baseUrl}/resume/${instanceId}`, {});
  }
  // getNextTasks(taskId: string) {

// this.http.post(`/api/workflows/${workflowId}/next-tasks`, {
//   currentTaskId: this.currentTaskId,
//   inputData: { approved: true }
// }).subscribe((nextTasks: string[]) => {
//   this.nextTasks = nextTasks;
// });

// }
 getNavigation(workflowId: string, request: WorkflowNavigationRequest): Observable<WorkflowNavigationResponse> {
    return this.http.post<WorkflowNavigationResponse>(`/api/workflows/${workflowId}/navigation`, request);
  }
  login() {
  this.http.post<any>(
    'https://localhost:14658/elsa/api/identity/token',
    {
      userName: 'admin',
      password: 'admin'
    }
  ).subscribe(res => {
    localStorage.setItem('token', res.accessToken);
    console.log('Logged in, token saved');
  });
}
}

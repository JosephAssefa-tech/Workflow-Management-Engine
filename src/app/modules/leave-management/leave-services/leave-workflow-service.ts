import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LeaveWorkflow, WorkflowConnection, WorkflowStep } from '../leave-models/workflow';

@Injectable({
  providedIn: 'root',
})
export class LeaveWorkflowService {
  private readonly apiBase = 'https://localhost:14658/elsa/api';

  constructor(private http: HttpClient) {}

  getWorkflow(definitionId: string): Observable<LeaveWorkflow> {
    return this.http
      .get<any>(`${this.apiBase}/workflow-definitions/${definitionId}`)
      .pipe(
        map(res => {
          const workflowJson = res;

          const steps = workflowJson.root.activities.map((a: any) => ({
            id: a.id,
            name: a.metadata?.displayText || a.name,
            type: a.type
          }));

          const connections = workflowJson.root.connections.map((c: any) => ({
            sourceActivityId: c.source.activity,
            sourcePort: c.source.port,
            targetActivityId: c.target.activity
          }));

          return { steps, connections };
        })
      );
  }

  getWorkflowInstance(instanceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/workflow-instances/${instanceId}`);
  }
}

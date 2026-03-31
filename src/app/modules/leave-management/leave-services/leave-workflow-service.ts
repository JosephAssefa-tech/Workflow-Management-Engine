import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LeaveWorkflow, WorkflowConnection, WorkflowStep } from '../leave-models/workflow';

@Injectable({
  providedIn: 'root',
})
export class LeaveWorkflowService {
  constructor(private http: HttpClient) {
    
  }
getWorkflow(definitionId: string): Observable<LeaveWorkflow> {
  return this.http
    .get<any>(`https://localhost:14658/elsa/api/workflow-definitions/${definitionId}`)
    .pipe(
      map(res => {
       // const workflowJson = res.definition;
       const workflowJson = res; // Assuming the API returns the workflow definition directly

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

}

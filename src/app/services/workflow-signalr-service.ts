import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkflowSignalrService {
  private hubConnection!: signalR.HubConnection;
  private workflowStartedSubject = new Subject<string>();

  workflowStarted$ = this.workflowStartedSubject.asObservable();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5067/hubs/workflow') 
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR connection error:', err));

    // Listen for workflow started events
    this.hubConnection.on('WorkflowStarted', (instanceId: string) => {
      console.log('WorkflowStarted:', instanceId);
      this.workflowStartedSubject.next(instanceId);
    });
  }

  // Optional: listen for other workflow updates
  listenToWorkflowUpdates() {
    this.hubConnection.on('WorkflowUpdate', (workflowId: string, message: string) => {
      console.log('Workflow Update:', workflowId, message);
    });
  }
}

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class WorkflowSignalrService {
    private hubConnection!: signalR.HubConnection;
    

  startConnection() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5067/workflowHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('SignalR Error: ', err));
  }

  listenToWorkflowUpdates() {
    this.hubConnection.on('WorkflowUpdate', (workflowId: string, message: string) => {
      console.log('Workflow Update:', workflowId, message);
    });
  }

}

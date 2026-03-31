import { Component, OnInit, signal } from '@angular/core';
import { WorkflowSignalrService } from './services/workflow-signalr-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('workflow-management-portal');

  constructor(private signalRService: WorkflowSignalrService) {}

  ngOnInit(): void {
   // this.signalRService.startConnection();
    this.signalRService.listenToWorkflowUpdates();
  }
}

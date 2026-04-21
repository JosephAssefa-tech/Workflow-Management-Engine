import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hr-approval',
  standalone: false,
  templateUrl: './hr-approval.html',
  styleUrl: './hr-approval.css',
})
export class HrApproval implements OnInit {
  @Input() step: any;
  @Input() decide!: (val: boolean) => void;
  @Input() workflowInstanceId$!: BehaviorSubject<string | null>;
  workflowInstanceId!: string | null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.workflowInstanceId$) {
      const id = this.workflowInstanceId$.getValue();
      if (id) {
        this.workflowInstanceId = id;
        console.log('HR initial workflowInstanceId:', id);
      }

      this.workflowInstanceId$.subscribe(newId => {
        this.workflowInstanceId = newId;
        console.log('HR received workflowInstanceId:', newId);
      });
    }
  }

  approve() {
    this.resume(true);
  }

  reject() {
    this.resume(false);
  }

  private getEventName(): string {
    return this.step?.properties?.eventName || this.step?.name || 'HRApproval';
  }

  private resume(decision: boolean) {
    if (!this.workflowInstanceId) {
      console.error('Cannot resume workflow: instanceId is undefined');
      return;
    }

    const eventName = this.getEventName();

    this.http.post(
      `https://localhost:14658/elsa/api/events/HRApproval/trigger`,
      {
        workflowInstanceId: this.workflowInstanceId,
        input: { approved: decision }
      },
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        console.log('HR workflow resumed successfully');
        this.decide(decision);
      },
      error: err => {
        console.error('HR resume failed', err);
      }
    });
  }
}

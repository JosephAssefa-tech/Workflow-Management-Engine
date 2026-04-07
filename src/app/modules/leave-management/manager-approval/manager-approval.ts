import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manager-approval',
  standalone: false,
  templateUrl: './manager-approval.html',
  styleUrl: './manager-approval.css',
})
export class ManagerApproval {
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
      console.log('Manager initial workflowInstanceId:', id);
    }

    this.workflowInstanceId$.subscribe(newId => {
      this.workflowInstanceId = newId;
      console.log('Manager received workflowInstanceId:', newId);
    });
  }
}
 approve() {
  //  this.decide(true);
    this.resume(true);
  }

  reject() {
  //  this.decide(false);
    this.resume(false);
  }

private resume(decision: boolean) {
    // if (!this.workflowInstanceId) {
    //   console.error('Cannot resume workflow: instanceId is undefined');
    //   return;
    // }

    console.log('Resuming instance:', this.workflowInstanceId);

this.http.post(
  `https://localhost:14658/elsa/api/workflow-instances/${this.workflowInstanceId}/resume`,
  { input: { approved: decision } },
  { responseType: 'text' }   // ✅ IMPORTANT
).subscribe({
  next: () => {
    console.log('Workflow resumed successfully');
    this.decide(decision);   // ✅ NOW IT WILL EXECUTE
  },
  error: err => {
    console.error('Resume failed', err);
  }
});
  }
}
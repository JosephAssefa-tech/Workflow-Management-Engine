import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WorkflowStateService } from '../leave-services/WorkflowStateService';
import { LeaveRequestService } from '../leave-services/LeaveRequestService';

@Component({
  selector: 'app-start-step',
  standalone: false,
  templateUrl: './start-step.html',
  styleUrl: './start-step.css',
})
export class StartStep  {
   @Output() workflowCreated = new EventEmitter<string>(); 
 @Input() step: any;          
  @Input() next!: (data?: any) => void; 
    loading = false;
     form!: FormGroup;




  constructor(
    private fb: FormBuilder,
    private state: WorkflowStateService,
    private leaveService: LeaveRequestService
  ) {
       this.form = this.fb.group({
      employeeName: ['', Validators.required],
      days: [1, [Validators.required, Validators.min(1)]],
      leaveDate: [null, Validators.required],
      reason: ['', Validators.required]
    });

  }

 ngOnInit() {
     const saved = this.state.get('leaveRequest');
    if (saved) this.form.patchValue(saved);
  }
  goNext() {
    if (this.form.valid && this.next) {
      this.next(this.form.value);
    }
  }

submit() {
  if (this.form.invalid) return;

  this.loading = true;
  const payload = this.form.value;

  this.leaveService.startWorkflow(payload).subscribe({
    next: (res: any) => {
      this.loading = false;

      const workflowInstanceId = res?.workflowState?.id;
      if (workflowInstanceId) {
        console.log('Workflow instance created:', workflowInstanceId);

        // Push the workflowInstanceId through next callback
        if (this.next) {
          this.next({ ...this.form.value, workflowInstanceId });
        }

        // Optional: still emit for parent component if needed
        this.workflowCreated.emit(workflowInstanceId);
      } else {
        console.warn('No workflow instance returned from backend:', res);
      }
    },
    error: (err) => {
      this.loading = false;
      console.error('Failed to start workflow instance', err);
    }
  });
}

}

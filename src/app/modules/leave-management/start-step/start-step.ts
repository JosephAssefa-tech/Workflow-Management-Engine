import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-start-step',
  standalone: false,
  templateUrl: './start-step.html',
  styleUrl: './start-step.css',
})
export class StartStep  {
 @Input() step: any;           // workflow step object
  @Input() next!: (data?: any) => void;  // move to next step
 form: FormGroup = new FormGroup({
    employeeName: new FormControl(''),
    reason: new FormControl(''),
  });

  goNext() {
    // Pass form data to parent stepper
    if (this.form.valid && this.next) {
      this.next(this.form.value);
    }
  }

  submit() {
    if (this.form.valid) {
      // Pass form data to the parent stepper
      this.next(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

}

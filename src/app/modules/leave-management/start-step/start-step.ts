import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-start-step',
  standalone: false,
  templateUrl: './start-step.html',
  styleUrl: './start-step.css',
})
export class StartStep  {
 @Input() step: any;          
  @Input() next!: (data?: any) => void; 

 form: FormGroup = new FormGroup({
    employeeName: new FormControl(''),
    reason: new FormControl(''),
  });

  goNext() {
    if (this.form.valid && this.next) {
      this.next(this.form.value);
    }
  }

  submit() {
    if (this.form.valid) {

      this.next(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

}

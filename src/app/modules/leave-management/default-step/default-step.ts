import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-step',
  standalone: false,
  templateUrl: './default-step.html',
  styleUrl: './default-step.css',
})
export class DefaultStep {
    @Input() step: any;
  @Input() next!: () => void;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-decision-step',
  standalone: false,
  templateUrl: './decision-step.html',
  styleUrl: './decision-step.css',
})
export class DecisionStep {
    @Input() step: any;
  @Input() decide!: (val: boolean) => void;

    approve() { this.decide(true); }
  reject() { this.decide(false); }

}

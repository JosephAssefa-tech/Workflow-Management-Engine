import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manager-approval',
  standalone: false,
  templateUrl: './manager-approval.html',
  styleUrl: './manager-approval.css',
})
export class ManagerApproval {
    @Input() step: any;
  @Input() decide!: (val: boolean) => void;
    approve() { this.decide(true); }
  reject() { this.decide(false); }
}

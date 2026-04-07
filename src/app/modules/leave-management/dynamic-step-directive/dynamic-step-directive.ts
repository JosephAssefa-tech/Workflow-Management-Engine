import { ComponentRef, Directive, EnvironmentInjector, Injector, Input, OnChanges, Type, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appDynamicStepHost]',
  standalone: false 
})
export class DynamicStepDirective implements OnChanges {
  @Input() workflowInstanceId$!: BehaviorSubject<string | null>;
  @Input() component!: Type<any>;
  @Input() step!: any;
  @Input() next!: (data?: any) => void;
  @Input() decide!: (val: boolean) => void;
  @Input() workflowInstanceId!: string;

  private compRef!: ComponentRef<any>;

  constructor(
    private vcr: ViewContainerRef,
    private injector: Injector,
    private envInjector: EnvironmentInjector
  ) {}


ngOnInit() {
  if (!this.component) return;

  this.compRef = this.vcr.createComponent(this.component, {
    injector: this.injector,
    environmentInjector: this.envInjector
  });

  this.setInputs();

  if (this.workflowInstanceId$) {
    this.workflowInstanceId$.subscribe(id => {
      this.workflowInstanceId = id;  // update internal value
      this.setInputs();              // propagate to dynamic component
      console.log('Directive updated workflowInstanceId:', id);
    });
  }
}
  ngOnChanges() {
    if (this.compRef) {
      this.setInputs();
    }
  }

//   private setInputs() {
//     console.log('Directive passing instanceId:', this.workflowInstanceId);
//     this.compRef.instance.step = this.step;

// this.compRef.instance.workflowInstanceId = this.workflowInstanceId;
//     if (this.next) {
//       this.compRef.instance.next = (data?: any) => this.next(data);
//     }

//     if (this.decide) {
//       this.compRef.instance.decide = this.decide;
//     }
//   }
// dynamic-step-directive.ts
private setInputs() {
  this.compRef.instance.step = this.step;
  this.compRef.instance.next = this.next;
  this.compRef.instance.decide = this.decide;


if (this.workflowInstanceId$) {

  const currentId = this.workflowInstanceId$.getValue();
  if (currentId) {
    this.compRef.instance.workflowInstanceId = currentId;
    console.log(`${this.compRef.instance.constructor.name} received workflowInstanceId immediately:`, currentId);
  }


  this.workflowInstanceId$.subscribe(id => {
    if (id) {
      this.compRef.instance.workflowInstanceId = id;
      console.log(`${this.compRef.instance.constructor.name} received workflowInstanceId:`, id);
    }
  });
}
}
}
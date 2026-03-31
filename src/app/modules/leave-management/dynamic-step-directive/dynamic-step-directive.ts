import { Directive, Injector, Input, OnChanges, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicStepHost]',
  standalone: false // ✅ use attribute selector
})
export class DynamicStepDirective implements OnChanges {
  @Input() component!: Type<any>;
  @Input() step!: any;
  @Input() next!: (data?: any) => void;
  @Input() decide!: (val: boolean) => void;

  constructor(private vcr: ViewContainerRef, private injector: Injector) {}

  ngOnChanges() {
    this.vcr.clear();
    if (!this.component) return;

    // <-- pass the injector so Angular resolves forms & material modules
    const compRef = this.vcr.createComponent(this.component, { injector: this.injector });

    compRef.instance.step = this.step;
    if (this.next) compRef.instance.next = (data?: any) => this.next(data);
    if (this.decide) compRef.instance.decide = this.decide;
  }
}
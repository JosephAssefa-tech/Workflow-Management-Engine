import { ComponentRef, Directive, EnvironmentInjector, Injector, Input, OnChanges, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicStepHost]',
  standalone: false // ✅ use attribute selector
})
export class DynamicStepDirective implements OnChanges {
  @Input() component!: Type<any>;
  @Input() step!: any;
  @Input() next!: (data?: any) => void;
  @Input() decide!: (val: boolean) => void;

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
  }

  ngOnChanges() {
    if (this.compRef) {
      this.setInputs(); // ✅ only update inputs, DON'T recreate
    }
  }

  private setInputs() {
    this.compRef.instance.step = this.step;

    if (this.next) {
      this.compRef.instance.next = (data?: any) => this.next(data);
    }

    if (this.decide) {
      this.compRef.instance.decide = this.decide;
    }
  }
}
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[cxFsDynamicComponent]' })
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

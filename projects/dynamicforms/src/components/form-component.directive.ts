import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { AbstractFormComponent } from './abstract-form.component';
import { DynamicFormsConfig } from '../core/config';

@Directive({
  selector: '[cxFormComponent]',
})
export class FormComponentDirective implements OnChanges, OnInit {
  @Input()
  config: FieldConfig;
  @Input()
  group: FormGroup;
  component: ComponentRef<AbstractFormComponent>;
  components: { [type: string]: Type<AbstractFormComponent> } = {};

  constructor(
    protected resolver: ComponentFactoryResolver,
    protected container: ViewContainerRef,
    protected formConfig: DynamicFormsConfig
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    for (const [name, obj] of Object.entries(
      this.formConfig.dynamicForms.components
    )) {
      this.components[name] = obj.component;
    }
    if (!this.components[this.config.type]) {
      const supportedTypes = Object.keys(this.components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<
      AbstractFormComponent
    >(this.components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}

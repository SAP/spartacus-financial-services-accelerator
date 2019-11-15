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
import { FieldConfig } from '../../models/field-config.interface';
import { FormGenericComponent } from '../form-generic.component';
import { FormConfig } from '../../config';

@Directive({
  selector: '[cxDynamicField]',
})
export class DynamicFieldDirective implements OnChanges, OnInit {
  @Input()
  config: FieldConfig;
  @Input()
  group: FormGroup;
  component: ComponentRef<FormGenericComponent>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private formConfig: FormConfig
  ) {}

  components: { [type: string]: Type<FormGenericComponent> } = {};

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    Object.entries(this.formConfig.components).forEach(([key, value]) => {
      this.components[key] = value.component;
    });

    if (!this.components[this.config.type]) {
      const supportedTypes = Object.keys(this.components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<
      FormGenericComponent
    >(this.components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}

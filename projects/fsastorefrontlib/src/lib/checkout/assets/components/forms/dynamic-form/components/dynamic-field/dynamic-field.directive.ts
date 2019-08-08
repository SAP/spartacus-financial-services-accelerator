import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent } from '../form-button/form-button.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormTitleComponent } from '../form-title/form-title.component';
import { FormDatepickerComponent } from '../form-datepicker/form-datepicker.component';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';


const components: {[type: string]: Type<Field>} = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
  title: FormTitleComponent,
  datepicker: FormDatepickerComponent
};

@Directive({
  selector: '[fsaDynamicField]'
})
export class DynamicFieldDirective implements OnChanges, OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}

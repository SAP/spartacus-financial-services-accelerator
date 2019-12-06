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
import { FieldConfig } from '../../models/form-config.interface';
import { FormButtonComponent } from '../form-button/form-button.component';
import { FormDatePickerComponent } from '../form-datepicker/form-datepicker.component';
import { FormGenericComponent } from '../form-generic.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormTitleComponent } from '../form-title/form-title.component';
import { FormRadioComponent } from '../form-radio/form-radio.component';
import { FormTextAreaComponent } from '../form-text-area/form-text-area.component';
import { FormTimeComponent } from '../form-time/form-time.component';

const components: { [type: string]: Type<FormGenericComponent> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
  title: FormTitleComponent,
  datepicker: FormDatePickerComponent,
  radio: FormRadioComponent,
  textarea: FormTextAreaComponent,
  time: FormTimeComponent,
};

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
    const component = this.resolver.resolveComponentFactory<
      FormGenericComponent
    >(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}

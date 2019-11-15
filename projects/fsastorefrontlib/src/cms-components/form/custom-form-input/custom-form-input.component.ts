import { Component } from '@angular/core';
import { FormInputComponent } from '@fsa/dynamicforms';

@Component({
  selector: 'fsa-form-input',
  templateUrl: './custom-form-input.component.html',
})
export class CustomFormInputComponent extends FormInputComponent {}

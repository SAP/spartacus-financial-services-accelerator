import { Validators } from '@angular/forms';
import { FormConfig } from '../models/form-config';

export const defaultFormConfig: FormConfig = {
  cssClasess: {
  formTitleClasses: 'mt-3 pl-3',
  inputWrapperClasses: 'form-group',
  inputClasses: 'form-control',
  labelClasses: 'col-form-label',
  radioInputWrapperClasses: 'form-check',
  radioInputClasses: 'form-check-input',
  radioLabelClasses: 'form-check-label mb-2',
  radioOptionLabelClasses: 'pl-3 pt-2',
  validatorMessageWrapperClasses: 'px-4',
  validatorMessageClasses: 'text-danger mb-2',
  submitButtonClasses: 'btn btn-primary',
  },
};

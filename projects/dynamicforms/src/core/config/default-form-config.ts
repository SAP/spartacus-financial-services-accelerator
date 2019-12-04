import { Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../../fsastorefrontlib/src/shared/util/validators/custom-form-validators';
import { FormConfig } from '../models/form-config';

export const defaultFormConfig: FormConfig = {
  components: {},
  validations: {
    required: {
      function: Validators.required,
    },
    dateCompare: {
      function: CustomFormValidators.compareToCurrentDate,
    },
  },
  cssClasess: {
    inputWrapperClasses: 'form-group',
    inputClasses: 'form-control',
    radioInputWrapperClasses: 'form-check',
    radioInputClasses: 'form-check-input',
    radioLabelClasses: 'form-check-label mb-2',
    radioOptionLabelClasses: 'pl-3 pt-2',
    labelClasses: 'col-form-label',
    submitButtonClasses: 'btn btn-primary',
    validatorMessageWrapperClasses: 'px-4',
    validatorMessageClasses: 'text-danger mb-2',
    formTitleClasses: 'mt-3 pl-3',
  },
};

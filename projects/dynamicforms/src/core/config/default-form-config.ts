import { FormConfig } from '../models/form-config';

export const defaultFormConfig: FormConfig = {
  cssClass: {
    formTitleClass: 'mt-3 pl-3',
    inputWrapperClass: 'form-group',
    inputClass: 'form-control',
    labelClass: 'col-form-label',
    radioInputWrapperClass: 'form-check',
    radioInputClass: 'form-check-input',
    radioLabelClass: 'form-check-label mb-2',
    radioOptionLabelClass: 'pl-3 pt-2',
    validatorMessageWrapperClass: 'px-4',
    validatorMessageClass: 'text-danger mb-2',
    submitButtonClass: 'btn btn-primary',
  },
};

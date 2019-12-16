import { FormConfig } from '../models/form-config';

export const defaultFormConfig: FormConfig = {
  cssClass: {
    form: '',
    controlElement: '',
    formTitle: 'mt-3 pl-3',
    inputWrapper: 'form-group',
    input: 'form-control',
    label: 'col-form-label',
    radioInputWrapper: 'form-check',
    radioInput: 'form-check-input',
    radioLabel: 'form-check-label mb-2',
    radioOptionLabel: 'pl-3 pt-2',
    validatorMessageWrapper: 'px-4',
    validatorMessage: 'text-danger mb-2',
    submitButton: 'btn btn-primary',
  },
};

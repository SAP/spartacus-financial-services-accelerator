import { FormConfig } from './form-config';
import { ButtonComponent } from '../../components/button/button.component';
import { DatePickerComponent } from '../../components/datepicker/datepicker.component';
import { InputComponent } from '../../components/input/input.component';
import { SelectComponent } from '../../components/select/select.component';
import { TitleComponent } from '../../components/title/title.component';
import { RadioComponent } from '../../components/radio/radio.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { TimeComponent } from '../../components/time/time.component';
import { Validators } from '@angular/forms';
import { DefaultFormValidators } from '../../util';

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
  components: {
    button: {
      component: ButtonComponent,
    },
    input: {
      component: InputComponent,
    },
    select: {
      component: SelectComponent,
    },
    title: {
      component: TitleComponent,
    },
    datepicker: {
      component: DatePickerComponent,
    },
    radio: {
      component: RadioComponent,
    },
    textarea: {
      component: TextAreaComponent,
    },
    time: {
      component: TimeComponent,
    },
  },
  validations: {
    required: {
      function: Validators.required
    },
    compareToCurrentDate: {
      function:  DefaultFormValidators.compareToCurrentDate
    },
    dateOfBirth: {
      function: DefaultFormValidators.dateOfBirthValidator
    },
    maxValue: {
      function: DefaultFormValidators.max
    },
    minValue: {
      function: DefaultFormValidators.min
    }
  }
};

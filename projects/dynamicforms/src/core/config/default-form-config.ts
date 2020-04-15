import { DynamicFormsConfig } from './form-config';
import { ButtonComponent } from '../../components/button/button.component';
import { DatePickerComponent } from '../../components/datepicker/datepicker.component';
import { InputComponent } from '../../components/input/input.component';
import { SelectComponent } from '../../components/select/select.component';
import { TitleComponent } from '../../components/title/title.component';
import { RadioComponent } from '../../components/radio/radio.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { TimeComponent } from '../../components/time/time.component';
import { DefaultFormValidators } from '../../util/validators/default-form-validators';

export const defaultFormConfig: DynamicFormsConfig = {
  dynamicForms: {
    formClass: '',
    components: {
      button: {
        component: ButtonComponent,
        cssEntries: {
          elementClass: 'btn btn-primary',
        },
      },
      input: {
        component: InputComponent,
        cssEntries: {
          wrapperClass: 'form-group',
          labelClass: 'col-form-label',
          elementClass: 'form-control',
        },
      },
      select: {
        component: SelectComponent,
        cssEntries: {
          wrapperClass: 'form-group',
          labelClass: 'col-form-label',
          elementClass: 'form-control',
        },
      },
      title: {
        component: TitleComponent,
        cssEntries: {
          elementClass: 'mt-3',
        },
      },
      datepicker: {
        component: DatePickerComponent,
        cssEntries: {
          wrapperClass: 'form-group',
          labelClass: 'col-form-label',
          elementClass: 'form-control',
        },
      },
      radio: {
        component: RadioComponent,
        cssEntries: {
          wrapperClass: 'form-check',
          labelClass: 'form-check-label mb-2',
          optionalClass: 'pl-3 pt-2',
          elementClass: 'form-check-input',
        },
      },
      textarea: {
        component: TextAreaComponent,
        cssEntries: {
          wrapperClass: 'form-group',
          labelClass: 'col-form-label',
          elementClass: 'form-control',
        },
      },
      time: {
        component: TimeComponent,
        cssEntries: {
          wrapperClass: 'form-group',
          labelClass: 'col-form-label',
          elementClass: 'form-control',
        },
      },
    },
    validators: {
      compareToCurrentDate: {
        validator: DefaultFormValidators.compareToCurrentDate,
      },
      dateOfBirth: {
        validator: DefaultFormValidators.dateOfBirthValidator,
      },
      maxValue: {
        validator: DefaultFormValidators.max,
      },
      minValue: {
        validator: DefaultFormValidators.min,
      },
      maxLength: {
        validator: DefaultFormValidators.maxLength,
      },
      minLength: {
        validator: DefaultFormValidators.minLength,
      },
      number: {
        validator: DefaultFormValidators.number,
      },
      email: {
        validator: DefaultFormValidators.email,
      },
      postalCode: {
        validator: DefaultFormValidators.postalCode,
      },
    },
  },
};

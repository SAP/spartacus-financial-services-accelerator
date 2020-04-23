import { ButtonComponent } from '../../components/button/button.component';
import { DatePickerComponent } from '../../components/datepicker/datepicker.component';
import { InputComponent } from '../../components/input/input.component';
import { RadioComponent } from '../../components/radio/radio.component';
import { SelectComponent } from '../../components/select/select.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { TimeComponent } from '../../components/time/time.component';
import { TitleComponent } from '../../components/title/title.component';
import { DefaultFormValidators } from './../../util/validators/default-form-validators';
import { DynamicFormsConfig } from './form-config';

export const defaultFormConfig: DynamicFormsConfig = {
  dynamicForms: {
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
      compareDates: {
        validator: DefaultFormValidators.compareDates,
      },
      checkValue: {
        validator: DefaultFormValidators.checkValue,
      },
      compareNumbers: {
        validator: DefaultFormValidators.compareNumbers,
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

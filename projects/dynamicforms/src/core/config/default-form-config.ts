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
import { SeparatorComponent } from '../../components/separator/separator.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { DynamicSelectComponent } from '../../components/dynamic-select/dynamic-select.component';
import { UserPrefillResolver } from '../resolver/user-prefill-resolver';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';

export const defaultFormConfig: DynamicFormsConfig = {
  dynamicForms: {
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
      dynamicSelect: {
        component: DynamicSelectComponent,
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
      checkbox: {
        component: CheckboxComponent,
      },
      separator: {
        component: SeparatorComponent,
      },
      popup: {
        component: PopUpComponent,
      },
    },
    validators: {
      compareToCurrentDate: {
        validator: DefaultFormValidators.compareToCurrentDate,
      },
      dateOfBirth: {
        validator: DefaultFormValidators.dateOfBirthValidator,
      },
      youngerThan: {
        validator: DefaultFormValidators.youngerThanValidator,
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
      equalDatesWithCondition: {
        validator: DefaultFormValidators.equalDatesWithCondition,
      },
    },
    prefill: {
      user: {
        prefillResolver: UserPrefillResolver,
      },
    },
  },
};

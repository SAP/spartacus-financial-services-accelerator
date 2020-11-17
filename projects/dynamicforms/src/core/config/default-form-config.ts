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
import { UserPrefillResolver } from '../resolver/user-prefill-resolver';
import { DataHolderComponent } from '../../components/data-holder/data-holder.component';

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
      dataHolder: {
        component: DataHolderComponent,
      },
    },
    validators: {
      compareToCurrentDate: {
        validator: DefaultFormValidators.compareToCurrentDate,
      },
      dateOfBirth: {
        validator: DefaultFormValidators.dateOfBirthValidator,
      },
      compareDOBtoAge: {
        validator: DefaultFormValidators.compareDOBtoAge,
      },
      compareAgeToDOB: {
        validator: DefaultFormValidators.compareAgeToDOB,
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
      containsValue: {
        validator: DefaultFormValidators.shouldContainValue,
      },
      compareNumbers: {
        validator: DefaultFormValidators.compareNumbers,
      },
      email: {
        validator: DefaultFormValidators.email,
      },
      alphanumeric: {
        validator: DefaultFormValidators.alphanumeric,
      },
    },
    prefill: {
      user: {
        prefillResolver: UserPrefillResolver,
      },
    },
  },
};

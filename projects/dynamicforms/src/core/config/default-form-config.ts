import { FormConfig } from './form-config';
import { FormButtonComponent } from './../form-components/form-button/form-button.component';
import { FormInputComponent } from './../form-components/form-input/form-input.component';
import { FormSelectComponent } from './../form-components/form-select/form-select.component';
import { FormTitleComponent } from './../form-components/form-title/form-title.component';
import { FormDatePickerComponent } from './../form-components/form-datepicker/form-datepicker.component';
import { FormRadioComponent } from './../form-components/form-radio/form-radio.component';
import { FormTextAreaComponent } from './../form-components/form-text-area/form-text-area.component';
import { Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../../fsastorefrontlib/src/shared/util/validators/custom-form-validators';

export const defaultFormConfig: FormConfig = {
  components: {
    button: {
      component: FormButtonComponent,
    },
    input: {
      component: FormInputComponent,
    },
    select: {
      component: FormSelectComponent,
    },
    title: {
      component: FormTitleComponent,
    },
    datepicker: {
      component: FormDatePickerComponent,
    },

    radio: {
      component: FormRadioComponent,
    },
    textarea: {
      component: FormTextAreaComponent,
    },
  },
  validations: {
    required: {
      function: Validators.required,
    },
    dateCompare: {
      function: CustomFormValidators.compareToCurrentDate,
    },
  },
};

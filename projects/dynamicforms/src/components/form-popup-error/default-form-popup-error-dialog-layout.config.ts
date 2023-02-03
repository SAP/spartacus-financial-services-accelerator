import { LayoutConfig, DIALOG_TYPE } from '@spartacus/storefront';
import { FormPopupErrorComponent } from './form-popup-error.component';

export const defaultFormPopupErrorDialogLayoutConfig: LayoutConfig = {
  launch: {
    FORM_POPUP_ERROR: {
      inlineRoot: true,
      component: FormPopupErrorComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER,
    },
  },
};

import { LayoutConfig, DIALOG_TYPE } from '@spartacus/storefront';
import { ReferredQuoteDialogComponent } from './referred-quote-dialog.component';

export const defaultOpenRefferedQuoteDialogLayoutConfig: LayoutConfig = {
  launch: {
    OPEN_REFFERED_QUOTE: {
      inline: true,
      component: ReferredQuoteDialogComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER,
    },
  },
};

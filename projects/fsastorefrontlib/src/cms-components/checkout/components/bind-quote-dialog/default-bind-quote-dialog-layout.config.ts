import { LayoutConfig, DIALOG_TYPE } from '@spartacus/storefront';
import { BindQuoteDialogComponent } from './bind-quote-dialog.component';

export const defaultBindQuoteDialogLayoutConfig: LayoutConfig = {
  launch: {
    BIND_QUOTE: {
      inline: true,
      component: BindQuoteDialogComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER,
    },
  },
};
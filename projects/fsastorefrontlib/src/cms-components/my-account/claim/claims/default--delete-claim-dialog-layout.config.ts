import { LayoutConfig, DIALOG_TYPE } from '@spartacus/storefront';
import { DeleteClaimDialogComponent } from '../delete-claim-dialog/delete-claim-dialog.component';

export const defaultDeleteClaimDialogLayoutConfig: LayoutConfig = {
  launch: {
    CLAIMS: {
      inlineRoot: true,
      component: DeleteClaimDialogComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER,
    },
  },
};
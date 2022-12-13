import { LayoutConfig, DIALOG_TYPE } from '@spartacus/storefront';
import { SyncPilotDialogComponent } from '../sync-pilot-dialog/sync-pilot-dialog.component';

export const defaultCmsSyncPilotDialogLayoutConfig: LayoutConfig = {
  launch: {
    SYNC_PILOT: {
      inlineRoot: true,
      component: SyncPilotDialogComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER,
    },
  },
};
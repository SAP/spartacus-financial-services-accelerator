import { ValueProvider } from '@angular/core';
import { provideCmsStructure } from '@spartacus/storefront';

export const defaultFSCmsContentProviders: ValueProvider[] = [
  provideCmsStructure({
    componentId: 'MessageNotificationComponent',
    pageSlotPosition: 'MessageNotification',
  }),
];

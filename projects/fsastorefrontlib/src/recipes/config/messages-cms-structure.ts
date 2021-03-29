import { ValueProvider } from '@angular/core';
import { provideCmsStructure } from '@spartacus/storefront';

export const defaultCmsContentProviders: ValueProvider[] = [
  provideCmsStructure({
    componentId: 'MessageNotificationComponent',
    pageSlotPosition: 'MessageNotification',
  }),
];

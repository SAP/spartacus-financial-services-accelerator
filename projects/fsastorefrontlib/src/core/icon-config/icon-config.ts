import { fontawesomeIconConfig, IconConfig } from '@spartacus/storefront';

export const iconConfig: IconConfig = {
  ...fontawesomeIconConfig,
  icon: {
    symbols: {
      PROPERTY: 'fs-icon icon-house',
      AUTO: 'fs-icon icon-auto',
      PERSON: 'fs-icon icon-heart',
      TRIP: 'fs-icon icon-plane',
      EVENT: 'fs-icon icon-event',
      PHONE: 'fas fa-phone',
    },
  },
};

export enum ICON_TYPE {
  PROPERTY = 'PROPERTY',
  AUTO = 'AUTO',
  PERSON = 'PERSON',
  TRIP = 'TRIP',
  EVENT = 'EVENT',
  PHONE = 'PHONE',
}

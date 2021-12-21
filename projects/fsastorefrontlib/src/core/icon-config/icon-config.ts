import {
  fontawesomeIconConfig,
  IconConfig,
  IconResourceType,
} from '@spartacus/storefront';

export const iconConfig: IconConfig = {
  ...fontawesomeIconConfig,
  icon: {
    symbols: {
      PROPERTY: 'fs-icon icon-house',
      AUTO: 'fs-icon icon-auto',
      PERSON: 'fs-icon icon-heart',
      TRIP: 'fs-icon icon-plane',
      EVENT: 'fs-icon icon-event',
      PHONE: 'fas fa-phone-alt',
      AGENT: 'fas fa-headset',
    },
    resources: [
      {
        type: IconResourceType.LINK,
        url: 'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
      },
    ],
  },
};

export enum FS_ICON_TYPE {
  PROPERTY = 'PROPERTY',
  AUTO = 'AUTO',
  PERSON = 'PERSON',
  TRIP = 'TRIP',
  EVENT = 'EVENT',
  PHONE = 'PHONE',
  AGENT = 'AGENT',
}

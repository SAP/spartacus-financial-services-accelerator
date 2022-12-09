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
      HEART: 'fs-icon icon-heart',
      TRIP: 'fs-icon icon-plane',
      EVENT: 'fs-icon icon-event',
      PHONE: 'fas fa-phone-alt',
      AGENT: 'fas fa-headset',
      PERSON: 'fas fa-user',
      CHEVRON_LEFT: 'fas fa-chevron-left fa-2x',
      CHEVRON_RIGHT: 'fas fa-chevron-right fa-2x',
      EDIT: 'fas fa-edit',
      REDO: 'fas fa-redo',
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
  PERSON = 'PERSON',
  AUTO = 'AUTO',
  HEART = 'HEART',
  TRIP = 'TRIP',
  EVENT = 'EVENT',
  PHONE = 'PHONE',
  AGENT = 'AGENT',
  CHEVRON_LEFT = 'CHEVRON_LEFT',
  CHEVRON_RIGHT = 'CHEVRON_RIGHT',
  EDIT = 'EDIT',
  REDO = 'REDO',
}

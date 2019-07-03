import { LayoutConfig } from '@spartacus/storefront';
import { CmsStructureConfig, CmsPageSlotsConfig, ContentSlotComponentData } from '@spartacus/core';

export const fsaLayoutConfig: LayoutConfig = {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1400
  },
  layoutSlots: {
    header: {
      md: {
        slots: [
          'SiteLogo',
          'SearchBox',
          'HeaderLinksSlot',
          'NavigationBar'
        ],
      },
      xs: {
        slots: ['PreHeader', 'SiteLogo', 'SearchBox'],
      },
    },
    navigation: {
      xs: {
        slots: ['HeaderLinksSlot', 'NavigationBar'],
      }
    }
  }
};

export const fsaCmsStructure:  {
  [key: string]: ContentSlotComponentData | any;
} = {
  HamburgerMenuComponent: {
    typeCode: 'HamburgerMenuComponent',
    flexType: 'HamburgerMenuComponent'
  },
  LoginComponent: {
    typeCode: 'LoginComponent',
    flexType: 'LoginComponent',
    uid: 'LoginComponent'
  }
};
export const fsaPageHeaderConfig: CmsPageSlotsConfig = {
  PreHeader: {
    componentIds: ['HamburgerMenuComponent']
  },
  HeaderLinksSlot: {
    componentIds: ['LoginComponent']
  }
};
export function fsaCmsContentConfig(): CmsStructureConfig {
  return {
    cmsStructure: {
      components: {
        ...fsaCmsStructure,
      },
      slots: {
        ...fsaPageHeaderConfig,
      },
      pages: []
    },
  };
}
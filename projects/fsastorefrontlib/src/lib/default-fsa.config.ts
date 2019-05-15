import { LayoutConfig } from '@spartacus/storefront';
import { CmsStructureConfig } from '@spartacus/core';

export const fsaLayoutConfig: LayoutConfig = {
  layoutSlots: {
    header: {
      md: {
        slots: [
          'SiteLogo',
          'SearchBox',
          'HeaderLinksSlot',
          'MiniCart',
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
      },
    },
  },
};

export const fsaCmsStructure: CmsStructureConfig = {
  cmsStructure: {
    components: {
      HamburgerMenuComponent: {
        typeCode: 'HamburgerMenuComponent',
        flexType: 'HamburgerMenuComponent',
      },
      LoginComponent: {
        typeCode: 'LoginComponent',
        flexType: 'LoginComponent',
        uid: 'LoginComponent'
      }
    },
    slots: {
      PreHeader: {
        componentIds: ['HamburgerMenuComponent']
      },
      HeaderLinksSlot: {
        componentIds: ['LoginComponent']
      }
    }
  }
};

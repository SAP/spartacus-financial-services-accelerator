import { LayoutConfig } from '@spartacus/storefront';

export const fsaLayoutConfig: LayoutConfig = {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1400,
  },
  layoutSlots: {
    header: {
      md: {
        slots: [
          'SiteContext',
          'SiteLogo',
          'SearchBox',
          'SiteLogin',
          'NavigationBar',
        ],
      },
      xs: {
        slots: ['PreHeader', 'SiteLogo', 'SearchBox'],
      },
    },
    navigation: {
      xs: {
        slots: ['SiteLogin', 'NavigationBar', 'TopHeaderSlot'],
      },
    },
    LandingPageTemplate: {
      slots: [
        'Section1',
        'Section2',
        'Section3',
        'Section4',
        'Section5',
        'Section6',
      ],
    },
    FSCategoryPageTemplate: {
      slots: [
        'Section1',
        'Section2',
        'Section3',
        'Section4',
        'Section5',
        'Section6',
      ],
    },
    CheckoutPageTemplate: {
      slots: ['TopContent', 'BodyContent', 'BottomContent'],
    },
    GeneralPageTemplate: {
      slots: [
        'Section1',
        'Section2',
        'Section3',
        'Section4',
        'Section5',
        'Section6',
      ],
    },
    AgentPortalPageTemplate: {
      slots: [
        'Section1',
        'Section2',
        'Section3',
        'Section4',
        'Section5',
        'Section6',
      ],
    },
  },
};

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
    LoginPageTemplate: {
      slots: ['TopContent', 'BodyContent'],
    },
    AccountPageTemplate: {
      slots: ['TopContent', 'BodyContent'],
    },
    MultiTabsCategoryPageTemplate: {
      slots: ['Section1', 'Section2'],
    },
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['TopContent', 'BodyContent', 'SideContent', 'Section1', 'Section2', 'Section3'],
    },
    InsuranceLandingPageTemplate: {
      slots: ['Section1', 'Section2A', 'Section2B', 'Section2C', 'Section3'],
    },
    FSCategoryPageTemplate: {
      slots: ['Section1', 'Section2A', 'Section2B', 'Section4'],
    },
    GeneralLayoutPageTemplate: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5',
      ],
    },
    FindAgentListTemplate: {
      slots: ['Section1'],
    },
    StoreFinderPageTemplate: {
      slots: ['SideContent', 'MiddleContent'],
    },
    FSRequestPageTemplate: {
      slots: ['TopContent', 'MiddleContent', 'BottomContent'],
    },
    OrderConfirmationPageTemplate: {
      slots: ['TopContent', 'BodyContent'],
    },
  },
};

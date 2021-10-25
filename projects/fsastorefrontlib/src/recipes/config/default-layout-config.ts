import { LayoutConfig } from '@spartacus/storefront';

export const layoutConfig: LayoutConfig = {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1400,
  },
  layoutSlots: {
    header: {
      lg: {
        slots: [
          'SiteContext',
          'SiteLogo',
          'SearchBox',
          'SiteLogin',
          'MessageNotification',
          'NavigationBar',
        ],
      },
      slots: ['PreHeader', 'SiteLogo', 'MessageNotification', 'SearchBox'],
    },
    navigation: {
      lg: { slots: [] },
      xs: {
        slots: ['SiteLogin', 'NavigationBar', 'SiteContext'],
      },
      slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
    },
    footer: {
      slots: ['Footer'],
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
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['TopContent', 'BodyContent', 'SideContent', 'BottomContent'],
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
    CompanyPageTemplate: {
      slots: ['TopContent', 'BodyContent'],
    },
  },
};

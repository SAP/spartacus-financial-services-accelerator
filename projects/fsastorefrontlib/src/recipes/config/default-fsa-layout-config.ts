import { LayoutConfig } from '@spartacus/storefront';

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
          'SiteLogin',
          'NavigationBar'
        ],
      },
      xs: {
        slots: ['PreHeader', 'SiteLogo', 'SearchBox'],
      },
    },
    navigation: {
      xs: {
        slots: ['SiteLogin', 'NavigationBar'],
      }
    },
    MultiTabsCategoryPageTemplate: {
      slots: ['Section1', 'Section2'],
    },
    InsuranceLandingPageTemplate: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5'
      ]
    },
    FSCategoryPageTemplate: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section4'
      ]
    },
    GeneralLayoutPageTemplate: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5'
      ]
    },
    FSRequestPageTemplate: {
        slots: [
          'TopContent',
          'BottomContent',
          'Section1'
        ]
    }
  }
};

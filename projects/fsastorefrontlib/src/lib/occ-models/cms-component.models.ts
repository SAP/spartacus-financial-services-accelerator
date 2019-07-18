import { CmsComponent, CmsBannerComponent } from '@spartacus/core';

export type CmsComponent = CmsComponent;

export interface CmsViewPoliciesComponent extends CmsComponent {
  numberOfPoliciesToDisplay?: string;
}

export interface CmsViewQuotesComponent extends CmsComponent {
  numberOfQuotesToDisplay?: string;
}

export interface CmsProductFeatureComponent extends CmsComponent {
  title?: string;
  description?: string;
  media?: string;
 }

 export interface CmsEnrichedResponsiveBannerComponent extends CmsBannerComponent {
  headingText?: string;
  styledText?: string;
  url?: string;
}

 export interface CmsInboxComponent extends CmsComponent {
   uid?: string;
   tabComponents?: string;
 }

 export interface CmsInboxTabComponent extends CmsComponent {
  title?: string;
}

export interface CmsMultiComparisonTabContainer extends CmsComponent  {
  simpleCMSComponents?: string;
}

export interface CMSComparisonTabComponent extends CmsComponent {
  title?: string;
  comparisonPanel?: string;
}

export interface ComparisonPanelCMSComponent extends CmsComponent {
  uid?: string;
  products?: string;
}

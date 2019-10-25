import { CmsComponent, CmsBannerComponent, Category } from '@spartacus/core';

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

export interface CmsCategoryFeatureComponent extends CmsComponent {
  title?: string;
  description?: string;
  media?: string;
}

export interface CmsCategoryFeatureCarouselComponent extends CmsComponent {
  title?: string;
  categoryFeatures: string;
}

export interface CmsEnrichedResponsiveBannerComponent
  extends CmsBannerComponent {
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

export interface CmsMultiComparisonTabContainer extends CmsComponent {
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

export interface CMSCustomComponentsContainer extends CmsComponent {
  uid?: string;
  simpleCMSComponents?: string;
}

export interface CMSFormSubmitComponent extends CmsComponent {
  uid?: string;
  category: Category;
}

export interface CmsAgentRootComponent extends CmsComponent {
  agentRootCategory?: string;
}

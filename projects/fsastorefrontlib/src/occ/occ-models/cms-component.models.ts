import {
  Category,
  CmsBannerComponent,
  CmsBannerComponentMedia,
  CmsComponent,
} from '@spartacus/core';
import { YFormCmsComponent } from '@fsa/dynamicforms';

export interface CmsProductFeatureComponent extends CmsComponent {
  title?: string;
  description?: string;
  media?: string;
  product: string;
}

export interface CmsCategoryFeatureComponent extends CmsComponent {
  title?: string;
  description?: string;
  media?: CmsBannerComponentMedia;
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
  messageGroup?: string;
}

export interface CmsMultiComparisonTabContainer extends CmsComponent {
  simpleCMSComponents?: string;
}

export interface CMSComparisonTabComponent extends CmsComponent {
  title?: string;
  comparisonPanel?: ComparisonPanelCMSComponent;
}

export interface ComparisonPanelCMSComponent extends CmsComponent {
  uid?: string;
  products?: string;
}

export interface CMSCustomComponentsContainer extends CmsComponent {
  uid?: string;
  simpleCMSComponents?: string;
  styleClasses?: string;
}

export interface CmsFormSubmitComponent extends YFormCmsComponent {
  category: Category;
}

export interface CmsAgentRootComponent extends CmsComponent {
  agentRootCategory?: string;
}

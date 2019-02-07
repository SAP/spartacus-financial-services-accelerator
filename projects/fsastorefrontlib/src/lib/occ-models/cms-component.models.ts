import { Component } from '@spartacus/core';
import { CmsBannerComponent } from '@spartacus/core';

export type CmsComponent = Component;

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


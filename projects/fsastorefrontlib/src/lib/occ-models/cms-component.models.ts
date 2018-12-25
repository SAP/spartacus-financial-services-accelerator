import { Component } from '@spartacus/core';

export type CmsComponent = Component;

export interface CmsViewPoliciesComponent extends CmsComponent {
  numberOfPoliciesToDisplay?: string;
}

export interface CmsViewQuotesComponent extends CmsComponent {
    numberOfQuotesToDisplay?: string;
  }
import { CmsComponent } from '@spartacus/core';

export interface YFormCmsComponent extends CmsComponent {
  uid?: string;
  formId: string;
  applicationId: string;
}

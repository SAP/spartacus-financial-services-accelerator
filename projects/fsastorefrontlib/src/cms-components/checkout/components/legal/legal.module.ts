import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { LegalCheckboxesComponent } from './legal-checkboxes/legal-checkboxes.component';
import { LegalDocumentsComponent } from './legal-documents/legal-documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    SpinnerModule,
    MediaModule,
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        LegalDocumentsFlex: {
          component: LegalDocumentsComponent,
        },
        LegalChecksFlex: {
          component: LegalCheckboxesComponent,
        },
      },
    }),
  ],
  declarations: [LegalDocumentsComponent, LegalCheckboxesComponent],
  exports: [LegalDocumentsComponent, LegalCheckboxesComponent],
})
export class LegalModule {}

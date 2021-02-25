import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DocumentsComponent } from './documents.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  declarations: [DocumentsComponent],
  exports: [DocumentsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountMyDocumentsFlex: {
          component: DocumentsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  entryComponents: [DocumentsComponent],
})
export class DocumentModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DocumentsOverviewComponent } from './documents-overview/documents-overview.component';
import { DocumentsTableModule } from './documents-table/documents-table.module';

@NgModule({
    imports: [CommonModule, SpinnerModule, I18nModule, DocumentsTableModule],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                AccountMyDocumentsFlex: {
                    component: DocumentsOverviewComponent,
                },
            },
        }),
    ],
    declarations: [DocumentsOverviewComponent],
    exports: [DocumentsOverviewComponent]
})
export class DocumentModule {}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { DocumentAdapter } from '../../../core';
import { OccDocumentAdapter } from './occ-document.adapter';
import { defaultDocumentConfig } from './default-occ-document-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: DocumentAdapter,
      useClass: OccDocumentAdapter,
    },
    provideConfig(defaultDocumentConfig),
  ],
})
export class DocumentOccModule {}

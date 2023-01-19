import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { SignDocumentsAdapter } from '../../../core';
import { OccSignDocumentsAdapter } from './occ-sign-documents.adapter';
import { defaultSignDocumentsConfig } from './default-occ-sign-documents-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: SignDocumentsAdapter,
      useClass: OccSignDocumentsAdapter,
    },
    provideConfig(defaultSignDocumentsConfig),
  ],
})
export class SignDocumentsOccModule {}

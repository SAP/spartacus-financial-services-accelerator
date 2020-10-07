import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { defaultOccFormConfig } from './default-occ-form-config';
import { OccFormAdapter } from './occ-form.adapter';
import { FormAdapter } from '../../../../src/core/connectors';
import { UploadAdapter } from '../../../core/connectors/upload.adapter';
import { OccUploadAdapter } from '../upload/occ-upload.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: FormAdapter,
      useClass: OccFormAdapter,
    },
    {
      provide: UploadAdapter,
      useClass: OccUploadAdapter,
    },
    provideConfig(defaultOccFormConfig),
  ],
})
export class FormOccModule {}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { defaultOccFormConfig } from './default-occ-form-config';
import { OccFormAdapter } from './occ-form.adapter';
import { FormAdapter } from '../../../core/connectors';
import { FileAdapter } from '../../../core/connectors/file.adapter';
import { OccFileAdapter } from '../file/occ-file.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: FormAdapter,
      useClass: OccFormAdapter,
    },
    {
      provide: FileAdapter,
      useClass: OccFileAdapter,
    },
    provideConfig(defaultOccFormConfig),
  ],
})
export class FormOccModule {}

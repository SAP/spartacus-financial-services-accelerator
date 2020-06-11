import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { defaultOccFormConfig } from './default-occ-form-config';
import { OccFormAdapter } from './occ-form.adapter';
import { FormAdapter } from '../../../../src/core/connectors';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: FormAdapter,
      useClass: OccFormAdapter,
    },
    provideConfig(defaultOccFormConfig),
  ],
})
export class FormOccModule {}

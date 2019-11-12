import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { FormComponentsModule } from './core/form-components/form-components.module';
import { FormContainerModule } from './core/form-containers/form-container.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormComponentsModule,
    FormContainerModule,
  ],
})
export class DynamicFormModule {}

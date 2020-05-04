import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, ConfigModule, I18nModule } from '@spartacus/core';
import { ComponentsModule } from './components/components.module';
import { defaultFormConfig } from './core/config/default-form-config';
import { DynamicFormsConfig } from './core/config/form-config';
import { FormCMSModule } from './cms-components/form-cms/form-cms.module';
import { FormContainerModule } from './core/form-containers/form-container.module';
import { FormStoreModule } from './core/store/form-store.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormContainerModule,
    FormCMSModule,
    FormStoreModule,
    ConfigModule.withConfig(defaultFormConfig),
    ComponentsModule,
  ],
  exports: [FormContainerModule],
  providers: [{ provide: DynamicFormsConfig, useExisting: Config }]
})
export class DynamicFormModule {}

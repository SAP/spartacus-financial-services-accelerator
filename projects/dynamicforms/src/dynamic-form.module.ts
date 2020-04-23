import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, ConfigModule, I18nModule } from '@spartacus/core';
import { FormContainerModule } from './core/form-containers/form-container.module';
import { defaultFormConfig } from './core/config/default-form-config';
import { DynamicFormsConfig } from './core/config/form-config';
import { ComponentsModule } from './components/components.module';
import { FormDefinitionStoreModule } from './core/store/form-definition-store.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormContainerModule,
    FormDefinitionStoreModule,
    ConfigModule.withConfig(defaultFormConfig),
    ComponentsModule,
  ],
  exports: [FormContainerModule],
  providers: [{ provide: DynamicFormsConfig, useExisting: Config }],
})
export class DynamicFormModule {}

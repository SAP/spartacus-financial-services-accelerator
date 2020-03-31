import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, ConfigModule, Config } from '@spartacus/core';
import { FormComponentsModule } from './core/form-components/form-components.module';
import { FormContainerModule } from './core/form-containers/form-container.module';
import { formEffects } from './core/effects/index';
import { EffectsModule } from '@ngrx/effects';
import { defaultFormConfig } from './core/config/default-form-config';
import { FormConfig } from './core/models/form-config';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormComponentsModule,
    FormContainerModule,
    EffectsModule.forFeature(formEffects),
    ConfigModule.withConfig(defaultFormConfig),
    ComponentsModule,
  ],
  exports: [FormContainerModule],
  providers: [{ provide: FormConfig, useExisting: Config }],
})
export class DynamicFormModule {}

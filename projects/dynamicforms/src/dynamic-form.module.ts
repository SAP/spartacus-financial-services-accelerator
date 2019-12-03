import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { FormComponentsModule } from './core/form-components/form-components.module';
import { FormContainerModule } from './core/form-containers/form-container.module';
import { formEffects } from './core/effects/index';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormComponentsModule,
    FormContainerModule,
    EffectsModule.forFeature(formEffects),
  ],
  exports: [FormContainerModule],
})
export class DynamicFormModule {}

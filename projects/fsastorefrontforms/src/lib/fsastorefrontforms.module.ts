import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';
import {
  StorefrontConfig,
  PageComponentModule,
  defaultCmsContentConfig,
} from '@spartacus/storefront';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { DynamicFormModule } from '../forms/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    PageComponentModule,
    DynamicFormModule,
    ConfigModule.forRoot(),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: translations.en,
        },
        chunks: translationChunksConfig,
      },
    }),
    ConfigModule.withConfigFactory(defaultCmsContentConfig),
  ],
  exports: [DynamicFormModule],
  declarations: [],
})
export class FSAStorefrontFormsModule {
  static withConfig(config?: StorefrontConfig): ModuleWithProviders {
    return {
      ngModule: FSAStorefrontFormsModule,
      providers: [provideConfig(config)],
    };
  }
}

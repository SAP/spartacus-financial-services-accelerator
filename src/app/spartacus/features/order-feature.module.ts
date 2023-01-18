import { NgModule } from '@angular/core';
import { ORDER_FEATURE } from '@spartacus/order/core';
import { OrderRootModule } from '@spartacus/order/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  orderTranslationChunksConfig,
  orderTranslations,
} from '@spartacus/order/assets';

@NgModule({
  imports: [OrderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORDER_FEATURE]: {
          module: () => import('@spartacus/order').then((m) => m.OrderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: orderTranslations,
        chunks: orderTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class OrderFeatureModule {}


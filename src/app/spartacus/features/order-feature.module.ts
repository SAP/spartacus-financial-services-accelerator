import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/core';
import { OrderRootModule } from '@spartacus/order/root';

@NgModule({
  imports: [OrderRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [ORDER_FEATURE]: {
          module: () =>
            import('@spartacus/order').then((m) => m.OrderModule),
        },
      },
    }),
  ],
})
export class OrderFeatureModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, UrlTranslationModule, CmsService } from '@spartacus/core';
import { CmsModule, ComponentsModule, CmsComponentData } from '@spartacus/storefront';
import { FSMiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    UrlTranslationModule,
    CmsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: { selector: 'fs-mini-cart' }
      }
    }),
  ],
  declarations: [FSMiniCartComponent],
  entryComponents: [FSMiniCartComponent],
  exports: [FSMiniCartComponent],
  providers: []
})
export class MiniCartModule {}

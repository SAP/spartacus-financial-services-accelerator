import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { AdministrationModule } from '@spartacus/organization';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import { FSUserComponentsModule } from './user/user-components.module';
import { FSUnitsComponentsModule } from './unit/units-components.module';
import { ProductAssignmentStoreModule } from '../../core/product-assignment/store/product-assignments-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FSUserComponentsModule,
    FSUnitsComponentsModule,
    AdministrationModule,
    ProductAssignmentStoreModule,
    ConfigModule.withConfig({
      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
  exports: [
    FSUserComponentsModule,
    FSUnitsComponentsModule,
    ProductAssignmentStoreModule,
  ],
})
export class B2bModule {}

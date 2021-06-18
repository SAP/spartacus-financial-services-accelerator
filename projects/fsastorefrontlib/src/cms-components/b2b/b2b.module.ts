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
import { FSB2BUserConnector } from '../../core/user/connectors/b2b-user-connector';
import {
  B2BUserConnector,
  B2BUserService,
} from '@spartacus/organization/administration/core';
import { FSB2BUserService } from '../../core';

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
  providers: [
    {
      provide: B2BUserConnector,
      useClass: FSB2BUserConnector,
    },
    {
      provide: B2BUserService,
      useClass: FSB2BUserService,
    },
  ],
  exports: [
    FSUserComponentsModule,
    FSUnitsComponentsModule,
    ProductAssignmentStoreModule,
  ],
})
export class B2bModule {}

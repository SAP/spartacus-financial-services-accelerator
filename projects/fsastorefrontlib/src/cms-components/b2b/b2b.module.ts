import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ConfigModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { AdministrationModule } from '@spartacus/organization';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfigFactoryFactory,
} from './unit/units.config';
import {
  userCmsConfig,
  userRoutingConfig,
  userTableConfigFactory,
} from './user/user.config';
import {
  ListModule,
  UserApproverListModule,
  UserChangePasswordFormModule,
  UserFormModule,
  UserPermissionListModule,
  UserUserGroupsModule,
} from '@spartacus/organization/administration/components';
import { FSUserComponentsModule } from './user/user-components.module';
import { ProductAssignmentsModule } from './unit/assignments/product-assignments.module';
import { FSUnitDetailsModule } from './unit/details/unit-details.module';
import { PotentialAssignmentsModule } from './unit/potential-assignments/potential-assignments.module';
import { ProductAssignmentStoreModule } from '../../core/product-assignment/store/product-assignments-store.module';
import { FSUserDetailsModule } from './user/details/user-details.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // FSUserComponentsModule,
    ProductAssignmentsModule,
    FSUnitDetailsModule,
    PotentialAssignmentsModule,
    AdministrationModule,
    ProductAssignmentStoreModule,
    ListModule,
    UserChangePasswordFormModule,
    UserFormModule,
    UserPermissionListModule,
    UserUserGroupsModule,
    UserApproverListModule,
    FSUserDetailsModule,
    ConfigModule.withConfig({
      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
  providers: [
    provideDefaultConfigFactory(unitsTableConfigFactoryFactory),
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
    provideDefaultConfig(userRoutingConfig),
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
  exports: [
    // FSUserComponentsModule,
    FSUserDetailsModule,
    ProductAssignmentsModule,
    FSUnitDetailsModule,
    PotentialAssignmentsModule,
    ProductAssignmentStoreModule,
  ],
})
export class B2bModule {}

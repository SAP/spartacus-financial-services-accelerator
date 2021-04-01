import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { AdministrationModule } from '@spartacus/organization';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfigFactoryFactory,
} from './units.config';
import { FSUnitDetailsModule } from './unit/details';
import { ProductAssignmentsModule } from './unit/assignments/product-assignments.module';
import { PotentialAssignmentsModule } from './unit/potential-assignments/potential-assignments.module';
import { ProductAssignmentStoreModule } from '../../core/product-assignment/store/product-assignments-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FSUnitDetailsModule,
    ProductAssignmentsModule,
    PotentialAssignmentsModule,
    AdministrationModule,
    ProductAssignmentStoreModule,
  ],
  providers: [
    provideDefaultConfigFactory(unitsTableConfigFactoryFactory),
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
  ],
  exports: [
    FSUnitDetailsModule,
    ProductAssignmentsModule,
    PotentialAssignmentsModule,
  ],
})
export class B2bModule {}

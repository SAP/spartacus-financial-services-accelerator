import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { ProductAssignmentModule } from './product-assignment';
import { FSUnitDetailsModule } from './unit/details';
import {
  unitsTableConfigFactory,
  unitsCmsConfig,
  unitsRoutingConfig,
} from './units.config';
// import { CxUnitAssignmentsModule } from './cx-unit-assignments/cx-unit-assignments.module';
// import { CxUnitDetailsModule } from './cx-unit-details/cx-unit-details.module';
// import { CxUnitPotentialAssignmentsModule } from './cx-unit-potential-assignments/cx-unit-potential-assignments.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductAssignmentModule,
    FSUnitDetailsModule,
    // CxUnitAssignmentsModule,
    // CxUnitPotentialAssignmentsModule,
  ],
  providers: [
    provideDefaultConfigFactory(unitsTableConfigFactory),
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
  ],
  exports: [ProductAssignmentModule, FSUnitDetailsModule],
})
export class B2bModule {}

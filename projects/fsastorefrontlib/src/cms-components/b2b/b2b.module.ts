import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfigFactoryFactory,
} from './units.config';
import { FSUnitDetailsModule } from './unit/details';
import { AssignmentsModule } from './unit/assignments/assignments.module';
import { PotentialAssignmentsModule } from './unit/potential-assignments/potential-assignments.module';
import { AdministrationModule } from '@spartacus/organization';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FSUnitDetailsModule,
    AssignmentsModule,
    PotentialAssignmentsModule,
    AdministrationModule,
  ],
  providers: [
    provideDefaultConfigFactory(unitsTableConfigFactoryFactory),
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
  ],
  exports: [FSUnitDetailsModule, AssignmentsModule, PotentialAssignmentsModule],
})
export class B2bModule {}

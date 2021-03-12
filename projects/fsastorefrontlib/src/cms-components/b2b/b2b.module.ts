import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { FSUnitDetailsModule } from './unit/details';
import {
  unitsTableConfigFactory,
  unitsCmsConfig,
  unitsRoutingConfig,
} from './units.config';
import { AssignmentsModule } from './unit/assignments/assignments.module';
import { PotentialAssignmentsModule } from './unit/potential-assignments/potential-assignments.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FSUnitDetailsModule,
    AssignmentsModule,
    PotentialAssignmentsModule,
  ],
  providers: [
    provideDefaultConfigFactory(unitsTableConfigFactory),
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
  ],
  exports: [FSUnitDetailsModule, AssignmentsModule, PotentialAssignmentsModule],
})
export class B2bModule {}

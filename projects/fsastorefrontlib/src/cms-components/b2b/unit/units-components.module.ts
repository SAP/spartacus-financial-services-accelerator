import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideConfig, provideConfigFactory } from '@spartacus/core';
import { UnitsComponentsModule } from '@spartacus/organization/administration/components';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfigFactoryFactory,
} from './units.config';
import { ProductAssignmentsModule } from './assignments/product-assignments.module';
import { FSUnitDetailsModule } from './details/unit-details.module';
import { PotentialAssignmentsModule } from './potential-assignments/potential-assignments.module';

@NgModule({
  imports: [
    RouterModule,
    ProductAssignmentsModule,
    FSUnitDetailsModule,
    PotentialAssignmentsModule,
    UnitsComponentsModule,
  ],
  providers: [
    provideConfigFactory(unitsTableConfigFactoryFactory),
    provideConfig(unitsRoutingConfig),
    provideConfig(unitsCmsConfig),
  ],
})
export class FSUnitsComponentsModule {}

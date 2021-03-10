import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { ProductAssignmentModule } from './product-assignment';
import {
  unitsTableConfigFactory,
  unitsCmsConfig,
  unitsRoutingConfig,
} from './units.config';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductAssignmentModule],
  providers: [
    provideDefaultConfigFactory(unitsTableConfigFactory),
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
  ],
  exports: [ProductAssignmentModule],
})
export class B2bModule {}

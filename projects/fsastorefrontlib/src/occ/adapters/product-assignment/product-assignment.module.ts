import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ProductAssignmentAdapter } from '../../../core/product-assignment/connectors/product-assignment.adapter';
import { defaultOccProductAssignmentConfig } from '../product-assignment/default-occ-product-assignment-config';
import { OccProductAssignmentAdapter } from '../product-assignment/occ-product-assignment.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: ProductAssignmentAdapter,
      useClass: OccProductAssignmentAdapter,
    },
    provideConfig(defaultOccProductAssignmentConfig),
  ],
})
export class ProductAssignmentOccModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubListModule } from '@spartacus/organization/administration/components';
import { I18nModule } from '@spartacus/core';
import { ProductAssignmentsComponent } from './product-assignments.component';
import { ActivateProductCellComponent } from './cells/activate-product-cell/activate-product-cell.component';
import { RemoveProductCellComponent } from './cells/remove-product-cell/remove-product-cell.component';

@NgModule({
  imports: [CommonModule, SubListModule, I18nModule, RouterModule],
  declarations: [
    ProductAssignmentsComponent,
    ActivateProductCellComponent,
    RemoveProductCellComponent,
  ],
})
export class ProductAssignmentsModule {}

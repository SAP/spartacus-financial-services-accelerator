import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubListModule } from '@spartacus/organization/administration/components';
import { I18nModule } from '@spartacus/core';
import { AssignmentsComponent } from './assignments.component';
import { ActivateProductCellComponent } from './cells/activate-product-cell/activate-product-cell.component';
import { RemoveProductCellComponent } from './cells/remove-product-cell/remove-product-cell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SubListModule, I18nModule, RouterModule],
  declarations: [
    AssignmentsComponent,
    ActivateProductCellComponent,
    RemoveProductCellComponent,
  ],
})
export class AssignmentsModule {}

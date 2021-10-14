import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotentialAssignmentsComponent } from './potential-assignments.component';
import { AssignProductCellComponent } from './cells/assign-product-cell/assign-product-cell.component';
import { SubListModule } from '@spartacus/organization/administration/components';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, SubListModule, I18nModule],
  declarations: [PotentialAssignmentsComponent, AssignProductCellComponent],
  exports: [PotentialAssignmentsComponent, AssignProductCellComponent],
})
export class PotentialAssignmentsModule {}

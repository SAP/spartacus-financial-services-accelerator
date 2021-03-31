import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  OrganizationTableType,
  SubListService,
} from '@spartacus/organization/administration/components';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';

@Injectable({
  providedIn: 'root',
})
export class PotentialAssingmensListService extends SubListService<any> {
  constructor(
    protected tableService: TableService,
    protected productAssignmentService: ProductAssignmentService
  ) {
    super(tableService);
  }

  protected tableType = OrganizationTableType.COST_CENTER_BUDGETS;

  protected load(_pagination: PaginationModel): Observable<EntitiesModel<any>> {
    return this.productAssignmentService
      .getPotentialProductAssignments()
      .pipe(map(raw => this.convertProductAssignments(raw)));
  }

  protected convertProductAssignments(assignments): EntitiesModel<any> {
    let products;

    if (assignments) {
      products = assignments.map((assignment: any) => ({
        name: assignment.product?.name,
        code: assignment.product?.code,
      }));
    }

    return {
      values: products,
    };
  }
}

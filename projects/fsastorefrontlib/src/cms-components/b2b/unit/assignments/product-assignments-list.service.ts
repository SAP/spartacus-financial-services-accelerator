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
export class ProductAssignmentsListService extends SubListService<any> {
  constructor(
    protected tableService: TableService,
    protected productAssignmentService: ProductAssignmentService
  ) {
    super(tableService);
  }

  protected tableType = OrganizationTableType.COST_CENTER;

  protected load(_pagination: PaginationModel): Observable<EntitiesModel<any>> {
    return this.productAssignmentService
      .getProductAssignments()
      .pipe(map(raw => this.convertProductAssignments(raw, true)));
  }

  protected convertProductAssignments(assignments, added): EntitiesModel<any> {
    const productAssignments = assignments.map((assignment: any) => ({
      name: assignment?.product?.name,
      active: assignment?.active,
      assignmentCode: assignment?.code,
      added,
    }));

    return {
      values: productAssignments,
    };
  }
}

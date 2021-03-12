import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { ProductAssignmentService } from '@spartacus/fsa-storefront';
import {
  OrganizationTableType,
  SubListService,
} from '@spartacus/organization/administration/components';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FSSubListService extends SubListService<any> {
  constructor(
    protected tableService: TableService,
    protected productAssignmentService: ProductAssignmentService
  ) {
    super(tableService);
  }

  protected tableType = OrganizationTableType.COST_CENTER;

  protected load(
    pagination: PaginationModel,
    ...args: any
  ): Observable<EntitiesModel<any>> {
    const assignedList = this.productAssignmentService
      .getProductAssignments()
      .pipe(map(raw => this.convertProductAssignments(raw, true)));
    return assignedList;
  }

  protected convertProductAssignments(assignments, added): EntitiesModel<any> {
    const products = assignments.map((assignment: any) => ({
      name: assignment.product.name,
      active: assignment.active,
      assignmentCode: assignment.code,
      added,
    }));

    return {
      values: products,
    };
  }
}

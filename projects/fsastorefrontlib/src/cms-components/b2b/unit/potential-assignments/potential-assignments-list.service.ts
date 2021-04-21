import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { SubListService } from '@spartacus/organization/administration/components';
import { TableService } from '@spartacus/storefront';
import { OrganizationTableType } from '../../../../occ/occ-models/occ.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { PaginationHelper } from '../../../../shared/util/helpers/PaginationHelper';

@Injectable({
  providedIn: 'root',
})
export class PotentialAssignmentsListService extends SubListService<any> {
  constructor(
    protected tableService: TableService,
    protected productAssignmentService: ProductAssignmentService
  ) {
    super(tableService);
  }

  protected tableType: any =
    OrganizationTableType.POTENTIAL_PRODUCT_ASSIGNMENTS;

  protected load(_pagination: PaginationModel): Observable<EntitiesModel<any>> {
    return this.productAssignmentService
      .getPotentialProductAssignments()
      .pipe(map(raw => this.convertProductAssignments(raw, _pagination)));
  }

  protected convertProductAssignments(
    assignments,
    pagination: PaginationModel
  ): EntitiesModel<any> {
    let products;
    if (assignments) {
      products = assignments.map((assignment: any) => ({
        name: assignment.product?.name,
        code: assignment.product?.code,
      }));
      return PaginationHelper.getPaginationResults(
        pagination.pageSize,
        pagination.currentPage,
        products
      );
    }
  }
}

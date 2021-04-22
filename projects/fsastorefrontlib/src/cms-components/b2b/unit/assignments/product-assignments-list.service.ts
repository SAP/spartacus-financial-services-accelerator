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
export class ProductAssignmentsListService extends SubListService<any> {
  constructor(
    protected tableService: TableService,
    protected productAssignmentService: ProductAssignmentService
  ) {
    super(tableService);
  }

  protected tableType: any = OrganizationTableType.PRODUCT_ASSIGNMENTS;

  protected load(pagination: PaginationModel): Observable<EntitiesModel<any>> {
    return this.productAssignmentService
      .getProductAssignments()
      .pipe(map(raw => this.convertProductAssignments(raw, true, pagination)));
  }

  protected convertProductAssignments(
    assignments,
    added,
    pagination: PaginationModel
  ): EntitiesModel<any> {
    const productAssignments = assignments.map((assignment: any) => ({
      name: assignment?.product?.name,
      active: assignment?.active,
      assignmentCode: assignment?.code,
      added,
    }));
    return PaginationHelper.getPaginationResults(
      pagination,
      productAssignments
    );
  }
}

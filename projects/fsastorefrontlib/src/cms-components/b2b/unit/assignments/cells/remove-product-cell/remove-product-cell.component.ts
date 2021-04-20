import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  CellComponent,
  CurrentUnitService,
} from '@spartacus/organization/administration/components';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'cx-fs-remove-product-cell',
  templateUrl: './remove-product-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveProductCellComponent extends CellComponent
  implements OnDestroy {
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected productAssignmentService: ProductAssignmentService,
    protected currentUnitService: CurrentUnitService
  ) {
    super(outlet);
  }

  private subscription = new Subscription();

  currentUnit$ = this.currentUnitService.item$;

  removeProduct(unitId, parentUintId) {
    this.productAssignmentService.removeProductAssignment(
      unitId,
      this.model.assignmentCode,
      parentUintId
    );
  }

  isUnitDefaultOrganizationOfUser(unitId: string): Observable<boolean> {
    return this.productAssignmentService
      .isUserAdminOfUnit(unitId)
      .pipe(map(isUserAdmin => !isUserAdmin));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

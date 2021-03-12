import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  CellComponent,
  CurrentUnitService,
} from '@spartacus/organization/administration/components';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'cx-fs-remove-product-cell',
  templateUrl: './remove-product-cell.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveProductCellComponent<T> extends CellComponent
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

  removeProduct() {
    this.subscription.add(
      this.currentUnit$
        .pipe(
          map(unit => {
            const parentUnitUid = unit.parentOrgUnit
              ? unit.parentOrgUnit.uid
              : unit.uid;
            this.productAssignmentService.removeProductAssignment(
              unit.uid,
              this.model.assignmentCode,
              parentUnitUid
            );
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

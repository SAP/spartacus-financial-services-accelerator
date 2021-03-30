import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
  selector: 'cx-fs-assign-product-cell',
  templateUrl: './assign-product-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignProductCellComponent extends CellComponent
  implements OnDestroy {
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected productAssignmentService: ProductAssignmentService,
    protected currentUnitService: CurrentUnitService
  ) {
    super(outlet);
  }

  private subscription = new Subscription();

  addProduct() {
    this.subscription.add(
      this.currentUnitService.b2bUnit$
        .pipe(
          map(unit => {
            this.productAssignmentService.createProductAssignment(
              unit,
              this.model.code
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

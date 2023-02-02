import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {
  AssignCellComponent,
  CurrentUnitService,
  ItemService,
  ListService,
  MessageService,
} from '@spartacus/organization/administration/components';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'cx-fs-assign-product-cell',
  templateUrl: './assign-product-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignProductCellComponent<FSProductAssignment>
  extends AssignCellComponent<FSProductAssignment>
  implements OnDestroy
{
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected productAssignmentService: ProductAssignmentService,
    protected currentUnitService: CurrentUnitService,
    protected organizationItemService: ItemService<FSProductAssignment>,
    protected messageService: MessageService,
    protected organizationSubListService: ListService<FSProductAssignment>
  ) {
    super(
      outlet,
      organizationItemService,
      messageService,
      organizationSubListService
    );
  }

  private subscription = new Subscription();
  protected readonly ASSIGNED_STATE = 'assigned';
  unit$: Observable<string> = this.currentUnitService.b2bUnit$;

  addProduct(unit: string) {
    this.productAssignmentService.createProductAssignment(
      unit,
      this.model.code
    );
    this.notify(this.model, this.ASSIGNED_STATE);
  }

  protected notify(item, state) {
    this.messageService.add({
      message: {
        key: `${this.organizationSubListService.viewType}.${state}`,
        params: {
          item,
        },
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

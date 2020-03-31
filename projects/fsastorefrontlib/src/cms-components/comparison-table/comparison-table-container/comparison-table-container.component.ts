import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsMultiComparisonTabContainer } from '../../../occ/occ-models';
import { ComparisonTableService } from '../comparison-table.service';

@Component({
  selector: 'cx-fs-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableContainerComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsMultiComparisonTabContainer>,
    protected comparisonTableService: ComparisonTableService
  ) {}

  component$: Observable<CmsMultiComparisonTabContainer>;
  tabs$;

  private subscription = new Subscription();

  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.subscription.add(
      this.component$
        .pipe(
          map(data => {
            if (data.simpleCMSComponents) {
              this.tabs$ = this.comparisonTableService.getComparisonTabs(
                data.simpleCMSComponents.split(' ')
              );
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

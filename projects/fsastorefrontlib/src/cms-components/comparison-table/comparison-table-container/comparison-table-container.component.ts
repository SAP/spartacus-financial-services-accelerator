import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComparisonTableService } from '../comparison-table.service';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsMultiComparisonTabContainer } from '../../../occ/occ-models';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableContainerComponent implements OnInit {
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

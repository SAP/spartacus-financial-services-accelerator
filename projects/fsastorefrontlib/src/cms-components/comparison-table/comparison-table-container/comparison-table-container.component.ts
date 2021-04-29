import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CmsMultiComparisonTabContainer,
  ComparisonPanelCMSComponent,
} from '../../../occ/occ-models';
import { ComparisonTableService } from '../comparison-table.service';

@Component({
  selector: 'cx-fs-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableContainerComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsMultiComparisonTabContainer>,
    protected comparisonTableService: ComparisonTableService,
    protected cmsService: CmsService
  ) {}

  component$: Observable<CmsMultiComparisonTabContainer>;
  tabs$;
  active = 0;
  initialTabs = [];
  availableTabs = [];

  private subscription = new Subscription();

  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.subscription.add(
      this.component$
        .pipe(
          map(data => {
            if (data.simpleCMSComponents) {
              this.initialTabs = data.simpleCMSComponents.split(' ');
            }
          })
        )
        .subscribe()
    );
    if (this.initialTabs.length > 0) {
      this.initialTabs.map(activetab => {
        this.tabs$ = this.cmsService.getComponentData(activetab);
        this.tabs$
          .pipe(
            map((availableTab: ComparisonPanelCMSComponent) => {
              if (availableTab?.uid) {
                this.availableTabs.push(availableTab);
              }
            })
          )
          .subscribe();
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

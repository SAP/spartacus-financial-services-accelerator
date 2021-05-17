import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { ComparisonTableService } from '../comparison-table.service';
import { CMSComparisonTabComponent } from 'fsastorefrontlib/occ';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  CmsMultiComparisonTabContainer,
  ComparisonPanelCMSComponent,
} from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableContainerComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsMultiComparisonTabContainer>,
    protected cmsService: CmsService,
    protected comparisonTableService: ComparisonTableService
  ) {}

  component$: Observable<CmsMultiComparisonTabContainer> = this.componentData
    .data$;
  availableTabs$: Observable<CMSComparisonTabComponent[]> = this
    .comparisonTableService.availableTab$;

  initialTabs: string[];
  tabs: ComparisonPanelCMSComponent[] = [];
  active = 0;

  private subscription = new Subscription();

  ngOnInit() {
    this.getInitialTabs();
    this.getAvailableTabs();
  }

  /**
   * Fetches all tabs available from BE configuration
   */
  getInitialTabs() {
    this.subscription.add(
      this.component$
        .pipe(
          filter(data => !!data?.simpleCMSComponents),
          map(components => {
            this.initialTabs = components.simpleCMSComponents.split(' ');
          })
        )
        .subscribe()
    );
  }

  /**
   * Fetches only tabs that are not restricted for current user
   */
  getAvailableTabs() {
    if (this.initialTabs.length > 0) {
      this.initialTabs.forEach(potentialTab => {
        this.subscription.add(
          this.cmsService
            .getComponentData(potentialTab)
            .pipe(
              filter(availableTab => !!availableTab?.uid),
              map((availableTab: ComparisonPanelCMSComponent) => {
                this.tabs.push(availableTab);
                this.comparisonTableService.setAvailableTabs(this.tabs);
              })
            )
            .subscribe()
        );
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

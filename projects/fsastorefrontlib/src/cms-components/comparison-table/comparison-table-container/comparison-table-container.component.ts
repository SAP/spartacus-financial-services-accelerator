import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
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
    protected cmsService: CmsService
  ) {}

  component$: Observable<CmsMultiComparisonTabContainer>;
  tabs$: Observable<ComparisonPanelCMSComponent>;
  active = 0;
  initialTabs: string[];
  availableTabs = [];

  private subscription = new Subscription();

  ngOnInit() {
    this.component$ = this.componentData.data$;
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
        this.tabs$ = this.cmsService.getComponentData(potentialTab);
        this.subscription.add(
          this.tabs$
            .pipe(
              filter(availableTab => !!availableTab?.uid),
              map((availableTab: ComparisonPanelCMSComponent) => {
                this.availableTabs.push(availableTab);
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

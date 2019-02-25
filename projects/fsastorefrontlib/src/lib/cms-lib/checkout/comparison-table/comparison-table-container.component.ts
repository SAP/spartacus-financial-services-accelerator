import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CmsComponentData} from '@spartacus/storefront';
import {Observable} from 'rxjs/internal/Observable';
import {CmsMultiComparisonTabContainer} from '../../../occ-models';

@Component({
  selector: 'fsa-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableContainerComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsMultiComparisonTabContainer>
  ) {
  }

  component$: Observable<CmsMultiComparisonTabContainer>;
  comparisonTabList: string[];

  ngOnInit() {
    this.component$ = this.componentData.data$;
  }
  getComparisonTabList(): string[] {
      this.component$.subscribe(data => {
        this.comparisonTabList = data.simpleCMSComponents.split(' ');
      })
    return this.comparisonTabList;
  }
}

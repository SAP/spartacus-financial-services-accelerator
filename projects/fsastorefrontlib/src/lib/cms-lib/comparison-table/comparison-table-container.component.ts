import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsMultiComparisonTabContainer } from '../../occ-models';

@Component({
  selector: 'fsa-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  styleUrls: ['./comparison-table-container.component.scss'],
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
    });
    return this.comparisonTabList;
  }
}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CmsService} from '@spartacus/core';
import {CmsComponentData} from '@spartacus/storefront';
import {CMSComparisonTabComponent} from '../../../occ-models';

@Component({
  selector: 'fsa-comparison-table-tab',
  templateUrl: './comparison-table-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableTabComponent implements OnInit {
  comparisonTab;

  constructor(
    protected componentData: CmsComponentData<CMSComparisonTabComponent>,
    protected cmsService: CmsService
  ) {
  }

  ngOnInit() {
    this.comparisonTab = JSON.stringify(this.componentData.data$.subscribe(data => this.comparisonTab = data));
  }
}

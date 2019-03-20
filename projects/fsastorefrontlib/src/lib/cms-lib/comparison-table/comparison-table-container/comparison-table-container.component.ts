import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComparisonTableService } from '../comparison-table.service';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsMultiComparisonTabContainer } from '../../../occ-models';

@Component({
  selector: 'fsa-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  styleUrls: ['./comparison-table-container.component.scss'],
  providers: [ComparisonTableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableContainerComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsMultiComparisonTabContainer>,
    protected comparisonTableService: ComparisonTableService,
    protected cmsService: CmsService
  ) {}

  component$;

  ngOnInit() {
    this.component$ = this.componentData.data$;
  }

  getTabs() {
    return {
      tab: this.comparisonTableService.getComparisonTabList(this.component$),
      tabTitle: this.comparisonTableService.getTabNames(this.component$)
    };
  }
}

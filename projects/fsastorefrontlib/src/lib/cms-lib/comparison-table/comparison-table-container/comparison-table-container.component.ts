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
  tabs$;

  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.component$.subscribe(data => {
    if(data.simpleCMSComponents){
        this.tabs$ = this.comparisonTableService.getComparisonTabs(data.simpleCMSComponents.split(' '));
      }
    })
  }
}

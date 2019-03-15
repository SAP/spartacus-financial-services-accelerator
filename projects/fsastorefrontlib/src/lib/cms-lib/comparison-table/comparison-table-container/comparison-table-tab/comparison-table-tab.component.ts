import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CMSComparisonTabComponent } from '../../../../occ-models';

@Component({
  selector: 'fsa-comparison-table-tab',
  templateUrl: './comparison-table-tab.component.html',
  styleUrls: ['./comparison-table-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableTabComponent implements OnInit {
  comparisonTab: Observable<CMSComparisonTabComponent>;

  constructor(
    protected componentData: CmsComponentData<CMSComparisonTabComponent>,
  ) {
  }

  ngOnInit() {
    this.comparisonTab = this.componentData.data$;
  }

}

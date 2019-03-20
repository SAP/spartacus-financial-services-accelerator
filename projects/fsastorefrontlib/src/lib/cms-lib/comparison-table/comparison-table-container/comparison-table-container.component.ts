import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComparisonTableService } from '../comparison-table.service';
import { CmsService } from '@spartacus/core';

@Component({
  selector: 'fsa-comparison-table-container',
  templateUrl: './comparison-table-container.component.html',
  styleUrls: ['./comparison-table-container.component.scss'],
  providers: [ComparisonTableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ComparisonTableContainerComponent implements OnInit {
  constructor(
    protected comparisonTableService: ComparisonTableService,
    protected cmsService: CmsService
  ) {}

  component$;

  ngOnInit() {
    this.component$ = this.comparisonTableService.getComponentData().data$;
  }

  getTabList(): string[] {
    return this.comparisonTableService.getComparisonTabList(this.component$);
  }

  getTabTitles(): string[] {
    return this.comparisonTableService.getTabNames(this.component$);
  }
}

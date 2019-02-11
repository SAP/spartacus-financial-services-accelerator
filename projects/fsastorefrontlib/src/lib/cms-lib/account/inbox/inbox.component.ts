import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsInboxComponent } from './../../../occ-models/cms-component.models';

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
  ) {}

  component$;
  ngOnInit() {
      this.component$ = this.componentData.data$;
  }
}

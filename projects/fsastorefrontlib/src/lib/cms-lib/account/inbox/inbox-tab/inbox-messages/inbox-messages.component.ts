import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CmsComponentMapping,
  StandardCmsComponentConfig,
} from '@spartacus/core';
import { Observable } from 'rxjs';

export interface Mapping extends StandardCmsComponentConfig {
  CMSInboxTabComponent?: CmsComponentMapping;
}

@Component({
  selector: 'fsa-messages-inbox',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxMessagesComponent implements OnInit {
  constructor() {}

  changeCheckboxes: Observable<boolean>;
  messagesObject$;
  selectedIndex: number;

  ngOnInit() {}
  toggleActiveAccordion(index: number) {
    this.selectedIndex === index
      ? (this.selectedIndex = -1)
      : (this.selectedIndex = index);
  }
}

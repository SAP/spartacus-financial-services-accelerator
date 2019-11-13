import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { InboxService } from '../../../../core/my-account/services/inbox.service';

@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxTabComponent implements OnInit {
  @Input() tabId: string;
  @Input() set currentTab(currentTab: boolean) {
    this.active = currentTab ? true : false;
  }
  component$;
  active;

  constructor(
    protected cmsService: CmsService,
    private inboxService: InboxService
  ) {}

  ngOnInit() {
    this.component$ = this.cmsService.getComponentData(this.tabId);
  }

  onTabClicked(messageGroup, title) {
    this.inboxService.setTitleAndMessageGroup(messageGroup, title);
    this.inboxService.checkAllMessagesSource.next(false);
  }
}

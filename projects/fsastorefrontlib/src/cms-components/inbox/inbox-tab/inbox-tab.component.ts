import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { InboxService } from '../../../core/inbox/facade/inbox.service';

@Component({
  selector: 'cx-fs-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxTabComponent implements OnInit {
  constructor(
    protected cmsService: CmsService,
    protected inboxService: InboxService
  ) {}

  component$;
  active: boolean;

  @Input() tabId: string;
  @Input() set currentTab(currentTab: boolean) {
    this.active = currentTab ? true : false;
  }

  ngOnInit() {
    this.component$ = this.cmsService.getComponentData(this.tabId);
  }

  onTabClicked(messageGroup, title) {
    this.inboxService.setTitleAndMessageGroup(messageGroup, title);
  }
}

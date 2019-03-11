import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { InboxService } from '../../../../my-account/assets/services/inbox.service';

@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InboxTabComponent implements OnInit {
  @Input() tabId: string;
  component$;
  active;
  activeGroupTitle: string;

  constructor (
    protected cmsService: CmsService,
    protected inboxService: InboxService
  ) {}

  ngOnInit() {
    this.component$ = this.cmsService.getComponentData(this.tabId);
  }
  onTabClicked(messageGroup, title) {
    this.inboxService.setActiveGroupTitle(title);
    this.inboxService.setActiveMessageGroup(messageGroup);
  }
  @Input()
  set chosen(chosen: boolean) {
    this.active = chosen ? true : false;
  }
}

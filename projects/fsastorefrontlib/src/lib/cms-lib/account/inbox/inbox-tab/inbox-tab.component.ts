import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { InboxService } from '../../../../my-account/assets/services/inbox.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InboxTabComponent implements OnInit {
  @Input() tabId: string;
  @Input() set currentTab(currentTab: boolean) {
    this.active = currentTab ? true : false;
  }
  component$;
  active;
  activeGroupTitle: string;

  constructor (
    protected cmsService: CmsService,
    protected inboxService: InboxService
  ) {}

  ngOnInit() {
    this.component$ = this.cmsService.getComponentData(this.tabId);
    this.component$
      .pipe(filter(data => data !== undefined && this.active))
      .subscribe(data =>
        this.inboxService.activeMessageGroupSource.next(data.messageGroup)
      );
  }
  onTabClicked(messageGroup, title) {
    this.inboxService.setActiveGroupTitle(title);
    this.inboxService.setActiveMessageGroup(messageGroup);
    this.inboxService.resetMessagesToSend();
  }
}

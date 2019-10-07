import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { CmsService } from '@spartacus/core';

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
  activeGroupTitle: string;

  constructor(protected cmsService: CmsService) {}

  ngOnInit() {
    this.component$ = this.cmsService.getComponentData(this.tabId);
  }
}

import { ChangeDetectionStrategy, Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CmsService } from '@spartacus/core';

@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InboxTabComponent implements OnInit {
  @Output() tabsSelected = new EventEmitter();
  @Input() tab: string;
  component$;

  constructor ( private cmsService: CmsService ) {}
    ngOnInit() {
      this.component$ = this.cmsService.getComponentData(this.tab);
    }
    onTabClicked(messageGroup) {
      this.tabsSelected.emit(messageGroup);
    }
}

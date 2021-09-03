import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService, CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { InboxService } from '../../core/my-account/facade/inbox.service';
import {
  CmsInboxComponent,
  CmsInboxTabComponent,
} from '../../occ/occ-models/cms-component.models';

@Component({
  selector: 'cx-fs-inbox',
  templateUrl: './inbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService,
    protected auth: AuthService
  ) {}

  subscription = new Subscription();
  component$: Observable<CmsInboxComponent>;
  initialTab$: Observable<CmsInboxTabComponent>;

  initialGroupName: string;
  mobileGroupTitle: string;
  tabs: string[];

  activeTabIndex = 0;

  ngOnInit() {
    this.subscription.add(
      this.componentData.data$.subscribe(data => {
        this.tabs =
          data && data.tabComponents ? data.tabComponents.split(' ') : [];
      })
    );
    this.initialTab$ = this.cmsService.getComponentData(this.tabs[0]);

    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle
        .pipe(
          mergeMap(currentTitle =>
            this.initialTab$.pipe(
              map(initial => {
                this.mobileGroupTitle = currentTitle?.title
                  ? currentTitle.title
                  : initial.title;
                this.initialGroupName = initial.messageGroup;
              })
            )
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.initialGroupName = null;
      this.subscription.unsubscribe();
    }
  }
}

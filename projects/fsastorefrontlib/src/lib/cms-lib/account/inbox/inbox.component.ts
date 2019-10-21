import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  // CmsComponentMapping,
  // StandardCmsComponentConfig,
  CmsService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { CmsInboxComponent, CmsComponent } from './../../../occ-models/cms-component.models';
import { InboxService } from '../../../my-account/assets/services/inbox.service';
import { CmsInboxTabComponent } from 'fsastorefrontlib/lib/occ-models';

// export interface Mapping extends StandardCmsComponentConfig {
//   CMSInboxTabComponent?: CmsComponentMapping;
// }

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService
  ) { }

  subscription = new Subscription();
  component$: Observable<CmsInboxComponent>;
  firstTab$: Observable<CmsInboxTabComponent>;
  tabs;
  mainCheckboxChecked = false;
  mobileGroupTitle: string;
  activeMessageGroup: string;
  activeTabIndex = 0;
  subjectSortOrder = 'desc';
  contentSortOrder = 'desc';
  sentSortOrder = 'desc';
  readState;
  shouldShow = false;

  ngOnInit() {
    this.subscription.add(this.componentData.data$.subscribe(
      data => (this.tabs = data.tabComponents.split(' '))
    ));
    this.firstTab$ = this.cmsService.getComponentData(this.tabs[0]); // taking the first tab as an active one on component load

    this.subscription.add(
      this.inboxService.activeGroupTitle.pipe(
        mergeMap(currentTitle => this.firstTab$.pipe(
          map(initial => {
            this.mobileGroupTitle = currentTitle ? currentTitle : initial.title;
          })
        ))
      ).subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

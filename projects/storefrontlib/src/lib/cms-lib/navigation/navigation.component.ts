import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnDestroy
} from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { NavigationService } from './navigation.service';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../cms/store';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CmsService } from '../../cms/facade/cms.service';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent extends AbstractCmsComponent
  implements OnDestroy {
  itemSubscription: Subscription;

  done = false;

  @Input()
  dropdownMode = 'list';
  @Input()
  node;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    private navigationService: NavigationService,
    protected store: Store<fromStore.CmsState>
  ) {
    super(cmsService, cd);
  }

  protected fetchData() {
    if (!this.component) {
      return;
    }
    const navigation = this.component.navigationNode
      ? this.component.navigationNode
      : this.component;

    this.itemSubscription = this.store
      .pipe(
        select(fromStore.itemsSelectorFactory(navigation.uid)),
        takeWhile(() => !this.done)
      )
      .subscribe(items => {
        if (items === undefined) {
          this.navigationService.getNavigationEntryItems(navigation, true, []);
        } else {
          this.done = true;
          this.node = this.navigationService.createNode(navigation, items);
          if (!this.cd['destroyed']) {
            this.cd.detectChanges();
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.itemSubscription) {
      this.done = true;
      this.itemSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
}

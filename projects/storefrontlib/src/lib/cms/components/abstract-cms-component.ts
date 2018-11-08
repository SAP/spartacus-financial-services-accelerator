import { Injectable, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CmsService } from '../facade/cms.service';

/**
 * @deprecated Inject CmsComponentData instead
 */
@Injectable()
export abstract class AbstractCmsComponent implements OnDestroy {
  @Input()
  public component: any = null;
  protected uid: string;
  protected contextParameters: any;
  protected subscription: Subscription;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef
  ) {}

  onCmsComponentInit(uid: string, contextParameters?: any) {
    this.uid = uid;
    this.contextParameters = contextParameters;
    this.initSubscription();
  }

  protected initSubscription() {
    this.subscription = this.cmsService
      .getComponentData(this.uid)
      .subscribe(component => {
        this.component = component;
        this.fetchData();
      });
  }

  protected fetchData() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
    // can be used by implementations
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

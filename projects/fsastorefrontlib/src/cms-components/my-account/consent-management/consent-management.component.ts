import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthService,
  GlobalMessageService,
  UserConsentService,
  UserIdService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ConsentManagementComponent } from '@spartacus/storefront';
import { filter, map, take } from 'rxjs/operators';
import { ConsentService } from '../../../core/my-account/facade/consent.service';
import {
  FSConsentTemplate,
  OBOConsentList,
} from '../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-consent-management',
  templateUrl: './consent-management.component.html',
})
export class FSConsentManagementComponent extends ConsentManagementComponent
  implements OnInit, OnDestroy {
  constructor(
    protected userConsentService: UserConsentService,
    protected globalMessageService: GlobalMessageService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected authService: AuthService,
    protected fsConsentService: ConsentService,
    protected userIdService: UserIdService
  ) {
    super(
      userConsentService,
      globalMessageService,
      anonymousConsentsConfig,
      anonymousConsentsService,
      authService
    );
  }

  private subscription = new Subscription();
  templateArray$: Observable<FSConsentTemplate[]>;
  consents$: Observable<OBOConsentList> = this.fsConsentService.getConsents();
  userId: string;

  ngOnInit(): void {
    super.ngOnInit();
    this.templateArray$ = this.templateList$.pipe(
      filter(data => data.length > 0),
      map((templateList: FSConsentTemplate[]) =>
        templateList.filter((template: FSConsentTemplate) => template.exposed)
      )
    );
    this.subscription.add(
      this.userIdService
        .getUserId()
        .pipe(take(1))
        .subscribe(occUserId => {
          this.userId = occUserId;
          this.fsConsentService.loadConsents(occUserId);
        })
    );
    this.userConsentService.loadConsents();
  }

  changeOBOPermission(
    customerUid: string,
    permissionKey: string,
    event: Event
  ) {
    this.subscription.add(
      this.fsConsentService
        .updateOBOPermission(
          this.userId,
          customerUid,
          permissionKey,
          (event.target as HTMLInputElement).checked
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

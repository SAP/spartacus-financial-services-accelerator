import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { UpdateProfileComponent } from '@spartacus/user/profile/components';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSUpdateProfileComponentService } from './update-profile-component.service';
import { DateConfig } from './../../../core/date-config/date-config';
import { Validators } from '@angular/forms';

@Component({
  selector: 'cx-fs-update-profile',
  templateUrl: './update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class FSUpdateProfileComponent extends UpdateProfileComponent
  implements OnInit, OnDestroy {
  constructor(
    protected service: FSUpdateProfileComponentService,
    private routingService: RoutingService,
    protected userAccountFacade: UserAccountFacade,
    protected config: DateConfig
  ) {
    super(service);
  }

  user$ = this.userAccountFacade.get();
  subscription = new Subscription();

  ngOnInit() {
    this.form
      .get('dateOfBirth')
      .setValidators([Validators.min(1900), Validators.max(2100)]);
    this.subscription.add(
      this.user$.pipe(map(user => this.service.patchForm(user))).subscribe()
    );
  }

  onSubmit(): void {
    this.service.updateProfile();
  }

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getDateFormat() {
    return this.config.date.format || '';
  }
}

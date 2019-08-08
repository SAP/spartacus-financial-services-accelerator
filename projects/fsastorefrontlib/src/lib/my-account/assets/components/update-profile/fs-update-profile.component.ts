import { Component } from '@angular/core';
import { UpdateProfileComponent } from '@spartacus/storefront';
import { FSUser } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { Observable, Subscription } from 'rxjs';
import { GlobalMessageService, UserService, RoutingService, GlobalMessageType, User } from '@spartacus/core';

@Component({
  templateUrl: './fs-update-profile.component.html'
})
export class FSUpdateProfileComponent extends UpdateProfileComponent {

  user$: Observable<FSUser>;
  private fsSubscription = new Subscription();

  constructor(
    private fsRoutingService: RoutingService,
    private fsUserService: UserService,
    private fsGlobalMessageService: GlobalMessageService
  ) {
    super(fsRoutingService, fsUserService, fsGlobalMessageService);
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.fsGlobalMessageService.add(
        { key: 'updateProfileForm.profileUpdateSuccess' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  onSubmit({ userUpdates }: { userUpdates: User }): void {
    super.onSubmit({userUpdates});
    this.fsSubscription.add(
      this.fsUserService
        .getUpdatePersonalDetailsResultSuccess()
        .subscribe(success => this.onSuccess(success))
    );
  }
}

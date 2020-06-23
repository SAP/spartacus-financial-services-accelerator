import { Component } from '@angular/core';
import { GlobalMessageService, RoutingService, UserService } from '@spartacus/core';
import { UpdateProfileComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { FSUser } from './../../../occ/occ-models/occ.models';

@Component({
  templateUrl: './update-profile.component.html',
})
export class FSUpdateProfileComponent extends UpdateProfileComponent {
  user$: Observable<FSUser>;

  constructor(
    protected fsRoutingService: RoutingService,
    protected fsUserService: UserService,
    protected fsGlobalMessageService: GlobalMessageService
  ) {
    super(fsRoutingService, fsUserService, fsGlobalMessageService);
  }

  onSubmit({ userUpdates }: { userUpdates: FSUser }): void {
    this.fsUserService.updatePersonalDetails(userUpdates);
  }
}

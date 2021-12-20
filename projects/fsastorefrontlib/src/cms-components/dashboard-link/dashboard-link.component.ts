import { Component } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { FSUser } from '../../occ';
import { FSUserRole } from '../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-dashboard-link',
  templateUrl: './dashboard-link.component.html',
})
export class DashboardLinkComponent {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected authService: AuthService
  ) {}

  sellerRole = FSUserRole.SELLER;
  user$: Observable<FSUser> = this.userAccountFacade.get();
  isUserLoggedIn$ = this.authService.isUserLoggedIn();
}

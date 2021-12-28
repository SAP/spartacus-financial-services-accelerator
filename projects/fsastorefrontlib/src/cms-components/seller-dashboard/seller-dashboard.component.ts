import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserIdService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';

import { OBOCustomerList, FSUser } from '../../occ/occ-models/occ.models';
import { ConsentConnector } from '../../core/my-account/connectors/consent.connector';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerDashboardComponent {
  constructor(
    protected consentConnector: ConsentConnector,
    protected userIdService: UserIdService,
    protected userAccountFacade: UserAccountFacade
  ) {}

  seller$: Observable<FSUser> = this.userAccountFacade.get();
  customers$: Observable<OBOCustomerList> = this.userIdService.getUserId().pipe(
    take(1),
    switchMap(userId => this.consentConnector.getOBOCustomerList(userId))
  );
  dashboardListVisible = false;

  showDashboardList() {
    this.dashboardListVisible = true;
  }
}

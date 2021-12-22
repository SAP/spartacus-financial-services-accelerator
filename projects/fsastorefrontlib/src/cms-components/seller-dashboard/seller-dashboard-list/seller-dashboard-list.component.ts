import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import {
  RoutingService,
  TranslationService,
  UserIdService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { OBOCustomerList, FSUser } from '../../../occ/occ-models/occ.models';
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';

@Component({
  selector: 'cx-fs-seller-dashboard-list',
  templateUrl: './seller-dashboard-list.component.html',
})
export class SellerDashboardListComponent {
  constructor(
    protected consentConnector: ConsentConnector,
    protected userIdService: UserIdService,
    protected translationService: TranslationService,
    protected routingService: RoutingService
  ) {}

  sort: string;
  iconTypes = ICON_TYPE;

  customers$: Observable<OBOCustomerList> = this.userIdService.getUserId().pipe(
    take(1),
    switchMap(userId => this.consentConnector.getOBOCustomerList(userId))
  );

  getUserProfile(customer: FSUser) {
    this.routingService.go({
      cxRoute: 'userProfile',
      params: { customerId: customer.uid },
    });
  }

  getSortLabels(): Observable<{
    name: string;
    status: string;
    email: string;
  }> {
    return combineLatest([
      this.translationService.translate('dashboard.sorting.name'),
      this.translationService.translate('fscommon.status'),
      this.translationService.translate('dashboard.sorting.email'),
    ]).pipe(
      map(([textByName, textByStatus, textByEmail]) => {
        return {
          name: textByName,
          status: textByStatus,
          email: textByEmail,
        };
      })
    );
  }
}

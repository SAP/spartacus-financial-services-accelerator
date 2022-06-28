import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import {
  PaginationModel,
  RoutingService,
  TranslationService,
  UserIdService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { OBOCustomerList, FSUser } from '../../../occ/occ-models/occ.models';
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';
import { FSSearchConfig } from '../../../core/my-account/services/inbox-data.service';
import { OboCustomerService } from '@spartacus/dynamicforms';

@Component({
  selector: 'cx-fs-seller-dashboard-list',
  templateUrl: './seller-dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerDashboardListComponent {
  constructor(
    protected consentConnector: ConsentConnector,
    protected userIdService: UserIdService,
    protected translationService: TranslationService,
    protected routingService: RoutingService,
    protected oboCustomerService: OboCustomerService
  ) {}

  sort: string;
  iconTypes = ICON_TYPE;
  userId: string;
  searchConfig: FSSearchConfig = {
    currentPage: 0,
  };

  customers$: Observable<OBOCustomerList> = this.userIdService.getUserId().pipe(
    take(1),
    switchMap(userId => {
      this.userId = userId;
      return this.getOBOCustomerList(userId);
    })
  );

  getOBOCustomerList(userId: string) {
    return this.consentConnector
      .getOBOCustomerList(userId, this.searchConfig)
      .pipe(
        filter(customers => !!customers),
        map(customers => {
          const pagination: PaginationModel = {
            currentPage: customers.pagination?.page,
            pageSize: customers.pagination?.count,
            totalPages: customers.pagination?.totalPages,
            totalResults: customers.pagination?.totalCount,
          };
          return {
            ...customers,
            pagination,
          };
        })
      );
  }

  getUserProfile(customer: FSUser) {
    this.oboCustomerService.setSelectedCustomer(customer);

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

  pageChange(pageNumber: number) {
    this.searchConfig.currentPage = pageNumber;
    this.customers$ = this.getOBOCustomerList(this.userId);
  }
}

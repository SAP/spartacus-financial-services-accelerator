import { Component } from '@angular/core';
import {
  ListModel,
  TranslationService,
  User,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { OBOCustomerList } from '../../occ/occ-models/occ.models';
import { ConsentConnector } from '../../core/my-account/connectors/consent.connector';

@Component({
  selector: 'cx-fs-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    private consentConnector: ConsentConnector,
    protected userIdService: UserIdService,
    protected translationService: TranslationService
  ) {}

  private DEFAULT_PAGE_SIZE = 10;
  private sortMapping = {
    byNameAsc: 'name:asc',
    byNameDesc: 'name:desc',
  };

  sort = 'byNameAsc';
  sortOptions = [
    {
      code: 'byNameAsc',
      selected: false,
    },
    {
      code: 'byNameDesc',
      selected: false,
    },
  ];

  customers$: Observable<OBOCustomerList> = this.userIdService.getUserId().pipe(
    take(1),
    switchMap(userId => this.consentConnector.getOBOCustomerList(userId))
  );

  getSortLabels(): Observable<{
    byNameAsc: string;
    byNameDesc: string;
  }> {
    return combineLatest([
      this.translationService.translate('myInterests.sorting.byNameAsc'),
      this.translationService.translate('myInterests.sorting.byNameDesc'),
    ]).pipe(
      map(([asc, desc]) => {
        return {
          byNameAsc: asc,
          byNameDesc: desc,
        };
      })
    );
  }

  sortChange(sort: string): void {
    this.sort = sort;
    // this.productInterestService.loadProductInterests(
    //   this.DEFAULT_PAGE_SIZE,
    //   0,
    //   this.sortMapping[sort]
    // );
  }

  pageChange(page: number): void {
    console.log(page);
  }
}

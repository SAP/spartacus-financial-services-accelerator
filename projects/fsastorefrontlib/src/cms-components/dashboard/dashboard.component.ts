import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { TranslationService, UserIdService } from '@spartacus/core';
import { OBOCustomerList } from '../../occ/occ-models/occ.models';
import { ConsentConnector } from '../../core/my-account/connectors/consent.connector';

@Component({
  selector: 'cx-fs-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private consentConnector: ConsentConnector,
    protected userIdService: UserIdService,
    protected translationService: TranslationService
  ) {}

  sort: string;

  ngOnInit() {
    this.getSortLabels().subscribe(data => console.log(data));
  }

  customers$: Observable<OBOCustomerList> = this.userIdService.getUserId().pipe(
    take(1),
    switchMap(userId => this.consentConnector.getOBOCustomerList(userId))
  );

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

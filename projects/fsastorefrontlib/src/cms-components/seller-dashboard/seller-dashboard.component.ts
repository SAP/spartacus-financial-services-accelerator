import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserIdService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';

import { OBOCustomerList, FSUser } from '../../occ/occ-models/occ.models';
import { ConsentConnector } from '../../core/my-account/connectors/consent.connector';

@Component({
  selector: 'cx-fs-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerDashboardComponent {
  constructor(
    protected consentConnector: ConsentConnector,
    protected userIdService: UserIdService,
    protected userAccountFacade: UserAccountFacade,
    protected renderer: Renderer2
  ) {}

  @ViewChild('dashboardOverviewContent') dashboardOverviewContent: ElementRef;
  @ViewChild('createCustomer') createCustomer: ElementRef;
  seller$: Observable<FSUser> = this.userAccountFacade.get();
  customers$: Observable<OBOCustomerList> = this.userIdService.getUserId().pipe(
    take(1),
    switchMap(userId => this.consentConnector.getOBOCustomerList(userId))
  );
  dashboardListVisible = false;
  showCustomerForm = false;

  showDashboardList() {
    this.dashboardListVisible = true;
  }
  showAddCustomerForm() {
    this.showCustomerForm = true;
    this.renderer.removeClass(
      this.dashboardOverviewContent.nativeElement,
      'slide-out'
    );
    this.renderer.addClass(this.createCustomer.nativeElement, 'slide-in');
  }
  addedUser(action: string) {
    this.showCustomerForm = false;
    this.renderer.addClass(
      this.dashboardOverviewContent.nativeElement,
      'slide-out'
    );
    this.renderer.removeClass(this.createCustomer.nativeElement, 'slide-in');
  }
}

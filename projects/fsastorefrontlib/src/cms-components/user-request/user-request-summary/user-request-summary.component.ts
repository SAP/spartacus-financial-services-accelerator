import { Component, OnInit } from '@angular/core';
import { UserRequestService } from 'projects/fsastorefrontlib/src/core/user-request/services';
import { Observable } from 'rxjs';
import { FSUserRequest } from 'projects/fsastorefrontlib/src/occ/occ-models';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'fsa-user-request-summary',
  templateUrl: './user-request-summary.component.html',
})
export class UserRequestSummaryComponent implements OnInit {

  constructor(
    protected userRequestService: UserRequestService,
    protected routingService: RoutingService,
    ) {}

  userRequest$: Observable<FSUserRequest>;

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
  }

  navigateTo(fnolCheckoutPage: string) {
    this.routingService.go(fnolCheckoutPage);
  }
}

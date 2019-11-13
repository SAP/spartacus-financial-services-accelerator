import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FSUserRequest } from '../../../occ/occ-models';
import { RoutingService } from '@spartacus/core';
import { UserRequestService } from '../../../core/user-request/services';

@Component({
  selector: 'fsa-user-request-summary',
  templateUrl: './user-request-summary.component.html',
})
export class UserRequestSummaryComponent implements OnInit {
  constructor(
    protected userRequestService: UserRequestService,
    protected routingService: RoutingService
  ) {}

  userRequest$: Observable<FSUserRequest>;

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
  }

  navigateTo(pageLabel: string) {
    this.routingService.go(pageLabel);
  }
}

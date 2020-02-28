import { Component, OnInit } from '@angular/core';
import { RoutingService, UserService } from '@spartacus/core';
import { PolicyService } from 'projects/fsastorefrontlib/src/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lib-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    protected routingService: RoutingService,
    protected userService: UserService,
  ) { }

  user$;
  subscription: Subscription;

  ngOnInit(): void {
    const params: Observable<any>[] = [
      this.routingService
        .getRouterState()
        .pipe(map(routingData => routingData.state.params.uid))
    ];

    this.subscription = combineLatest(params).subscribe(
      ([uid]) => {
        if (uid) {
          this.policyService.loadPolicyDetails(policyId, contractId);
        }
      }
    );

    this.user$ = this.userService.get();
  }


}

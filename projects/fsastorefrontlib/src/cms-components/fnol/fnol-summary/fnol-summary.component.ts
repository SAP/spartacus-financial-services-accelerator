import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../../../occ/occ-models';
import { RoutingService } from '@spartacus/core';
import { ClaimService } from './../../../core/my-account/facade/claim.service';

@Component({
  selector: 'fsa-fnol-summary',
  templateUrl: './fnol-summary.component.html',
})
export class FNOLSummaryComponent implements OnInit {
  constructor(
    protected claimService: ClaimService,
    protected routingService: RoutingService
  ) {}

  claimRequest$: Observable<Claim>;

  ngOnInit() {
    this.claimRequest$ = this.claimService.getCurrentClaim();
  }

  navigateTo(pageLabel: string) {
    this.routingService.go(pageLabel);
  }
}

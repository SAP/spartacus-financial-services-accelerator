import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Claim } from '../../../occ/occ-models';
import { ClaimService } from './../../../core/my-account/facade/claim.service';

@Component({
  selector: 'cx-fs-fnol-summary',
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

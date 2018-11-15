import { Component, OnInit } from '@angular/core';
import * as fromClaimStore from '../../../my-account/applications/store';
import { Store } from '@ngrx/store';
import { ClaimService } from '../../../my-account/applications/services/claim.service';


@Component({
  selector: 'fsa-claims-page-layout',
  templateUrl: './claims-page-layout.component.html',
  styleUrls: ['./claims-page-layout.component.scss']
})
export class ClaimsPageLayoutComponent implements OnInit {

  constructor(
    protected store: Store<fromClaimStore.ClaimState>,
    protected claimService: ClaimService
  ) {}

  claims = 'Claims';

  ngOnInit() {
    this.claimService.loadClaims();
  }
}

import { Component, OnInit } from '@angular/core';
import { ClaimDataService } from 'projects/fsastorefrontlib/src/core/my-account/services';

@Component({
  selector: 'fsa-user-request-summary',
  templateUrl: './user-request-summary.component.html',
})
export class UserRequestSummaryComponent implements OnInit {
  constructor(
    protected claimData: ClaimDataService
  ) {}

  ngOnInit() {
    console.log(this.claimData);
  }
}

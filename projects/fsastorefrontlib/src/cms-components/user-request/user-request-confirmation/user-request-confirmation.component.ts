import { Component, OnInit } from '@angular/core';
import { ClaimDataService } from './../../../core/my-account/services/claim-data.service';

@Component({
  selector: 'fsa-user-request-confirmation',
  templateUrl: './user-request-confirmation.component.html',
})
export class UserRequestConfirmationComponent implements OnInit {
  claimNumber;

  constructor(protected claimDataService: ClaimDataService) {}

  ngOnInit() {
    this.claimNumber = this.claimDataService.claimData.claimNumber;
  }
}

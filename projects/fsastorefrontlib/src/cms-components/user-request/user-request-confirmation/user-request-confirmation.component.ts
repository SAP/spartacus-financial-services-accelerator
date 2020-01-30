import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClaimDataService } from './../../../core/my-account/services/claim-data.service';
import { genericIcons } from '../../../assets/icons/generic-icons';

@Component({
  selector: 'fsa-user-request-confirmation',
  templateUrl: './user-request-confirmation.component.html',
})
export class UserRequestConfirmationComponent implements OnInit {
  claimNumber;

  imageSrc;

  constructor(
    protected claimDataService: ClaimDataService,
    protected domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.claimNumber = this.claimDataService.claimData.claimNumber;
  }
  getImagelink() {
    this.imageSrc = this.domSanitizer.bypassSecurityTrustUrl(
      genericIcons.documentNotice
    );
  }
}

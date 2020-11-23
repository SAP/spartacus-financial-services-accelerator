import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { genericIcons } from '../../../assets/icons/generic-icons';
import { ClaimService } from './../../../core/my-account/facade/claim.service';

@Component({
  selector: 'cx-fs-fnol-confirmation',
  templateUrl: './fnol-confirmation.component.html',
})
export class FNOLConfirmationComponent implements OnInit {
  claim$;

  constructor(
    protected claimService: ClaimService,
    protected domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.claim$ = this.claimService.getCurrentClaim();
  }
  getImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(genericIcons.document);
  }
}

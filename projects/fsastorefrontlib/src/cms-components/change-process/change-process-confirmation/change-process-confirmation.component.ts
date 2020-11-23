import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { genericIcons } from '../../../assets/icons/generic-icons';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'cx-fs-change-process-confirmation',
  templateUrl: './change-process-confirmation.component.html',
})
export class ChangeProcessConfirmationComponent implements OnInit {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected domSanitizer: DomSanitizer
  ) {}

  changeRequest$;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
  }

  getImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(genericIcons.document);
  }
}

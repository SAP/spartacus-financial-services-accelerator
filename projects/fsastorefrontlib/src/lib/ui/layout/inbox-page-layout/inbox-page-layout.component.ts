import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../my-account/assets/services';

@Component({
  selector: 'fsa-inbox-page-layout',
  templateUrl: './inbox-page-layout.component.html'
})
export class InboxPageLayoutComponent implements OnInit {

  constructor(
    protected policyService: PolicyService
  ) {}

  ngOnInit() {
    this.policyService.loadPremiumCalendar();
  }
}

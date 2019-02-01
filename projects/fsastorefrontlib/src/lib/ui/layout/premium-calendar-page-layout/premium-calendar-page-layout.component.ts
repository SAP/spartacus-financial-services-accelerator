import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../my-account/assets/services';

@Component({
  selector: 'fsa-premium-calendar-page-layout',
  templateUrl: './premium-calendar-page-layout.component.html'
})
export class PremiumCalendarPageLayoutComponent implements OnInit {

  constructor(
    protected policyService: PolicyService
  ) {}

  ngOnInit() {
    this.policyService.loadPremiumCalendar();
  }
}

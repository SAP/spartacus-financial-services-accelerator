import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../my-account/assets/services/policy.service';

@Component({
  selector: 'fsa-premium-calendar-page-layout',
  templateUrl: './premium-calendar-page-layout.component.html'
})
export class PremiumCalendarPageLayoutComponent implements OnInit {
  constructor(
    protected premiumCalendarService: PolicyService
  ) {}

  policies = 'Policies';

  ngOnInit() {
    this.premiumCalendarService.loadPremiumCalendar();
  }
}

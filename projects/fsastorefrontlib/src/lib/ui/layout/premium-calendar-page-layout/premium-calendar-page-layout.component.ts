import { Component, OnInit } from '@angular/core';
import { PremiumCalendarService } from '../../../my-account/assets/services/premium-calendar.service';

@Component({
  selector: 'fsa-premium-calendar-page-layout',
  templateUrl: './premium-calendar-page-layout.component.html',
  styleUrls: ['./premium-calendar-page-layout.component.scss']
})
export class PremiumCalendarPageLayoutComponent implements OnInit {
  constructor(
    protected premiumCalendarService: PremiumCalendarService
  ) {}

  policies = 'Policies';

  ngOnInit() {
    this.premiumCalendarService.loadPremiumCalendar();
  }
}

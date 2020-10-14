import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { PolicyService } from '../../../core/my-account/facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-fs-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnInit, OnDestroy {
  constructor(
    protected config: OccConfig,
    protected policyService: PolicyService
  ) {}

  policies$;
  policiesLoaded$;
  selectedIndex: number[] = [];

  private subscription = new Subscription();

  ngOnInit() {
    this.policyService.loadPremiumCalendar();
    this.policies$ = this.policyService.getPremiumCalendar();
    this.policiesLoaded$ = this.policyService.getPremiumCalendarLoaded();
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  toggleActiveAccordion(index: number) {
    this.selectedIndex.includes(index)
      ? this.selectedIndex.splice(this.selectedIndex.indexOf(index), 1)
      : this.selectedIndex.push(index);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
